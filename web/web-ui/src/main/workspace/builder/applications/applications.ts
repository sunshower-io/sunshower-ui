/**
 * Created by dustinlish on 11/9/16.
 */


import {
    InfrastructureDescriptor
} from "../../../../task/infrastructure";

import {
    Task,
    TaskManager, CycleDetectedEvent, TaskAddedEvent
} from "../../../../task/tasks";


import {
    Listener,
    ObservedEvent
} from "../../../../utils/observer";


import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";

import * as PNotify from 'pnotify';
import 'pnotify.callbacks';

import {
    mxGraph,
    Layer,
    mxCell,
} from "mxgraph";

import {
    AbstractGraph,
    GraphProcessor
} from '../abstract-graph'


import {UUID} from "../../../../utils/uuid";

import {
    Builder, NavigationAware
} from '../builder';

import {Builder as GBuilder} from '../graph/builder'
import {Registry} from 'utils/registry';
import {DeploymentUnit} from "../cells/deployment";

@inject(HttpClient, TaskManager, Builder, Registry)
export class Applications extends AbstractGraph implements Listener, NavigationAware {

    constructor(private client: HttpClient,
                private taskManager: TaskManager,
                private parent: Builder,
                registry:Registry
    ) {
        super(registry);
        taskManager.addEventListener('task-added', this);
        taskManager.addEventListener('cycle-detected', this);
    }


    attached(): void {
        super.attached();
        this.insertTasks(this.taskManager.getTasks());
        this.parent.set(this);
    }


    modifyGraph(event: Event) {
        let context = {
                graph: this.graph
            },
            processor = (<any>event).detail as GraphProcessor;
        processor.apply(context);

    }

    addTask(event: Event) {
        let details = (<any>event).detail,
            offset = $(this.graph.container).offset().top;

        this.client.fetch(`docker/images/${details.value}`)
            .then(r => r.json())
            .then(r => {
                let task = new Task(
                    r.logo_url.large,
                    r.name,
                    {
                        x: details.location.x,
                        y: details.location.y - offset
                    },
                );
                task.addDeploymentTarget(new InfrastructureDescriptor());
                this.taskManager.addTask(task);
            });
    }


    private computePosition(): JQueryCoordinates {
        if (this.rightVisible) {
            let right = $(this.rightSidebar).children(':first-child'),
                rightOffset = $(right).offset();
            return {
                top: rightOffset.top + 20,
                left: rightOffset.left - 320
            };
        } else {
            let offset = $(this.container).offset(),
                width = $(this.container).width();
            return {
                top: offset.top + 20,
                left: width - 320
            }
        }
    }


    handleCycle(cycleEvent: CycleDetectedEvent) {
        new PNotify({
            title: 'Error',
            text: 'Adding that edge would introduce an irreducible cycle',
            opacity: 0.90,
            type: 'error',
            addclass: 'graph-error',
            width: '300px',
            context: $(this.container),
            before_open: (f) => {
                let position = this.computePosition();
                f.get().css(position);
            }
        });
    }

    apply(event: ObservedEvent): void {
        if (event instanceof TaskAddedEvent) {
            let task = event.target,
                tasks = [].concat(task as Task);

            this.insertTasks(tasks);
        } else if (event instanceof CycleDetectedEvent) {
            this.handleCycle(event as CycleDetectedEvent);
        }
    }


    private insertTasks(tasks: Task[]) {
        let graph = this.graph,
            parent = this.graph.getDefaultParent();
        graph.getModel().beginUpdate();
        try {
            for (let task of tasks) {
                this.insertTask(graph, parent, task);
            }
        } finally {
            graph.getModel().endUpdate();
        }
    }


    private createSource(task: Task, parent: Layer): mxCell {
        let cell = new DeploymentUnit (
            this.registry,
            task,
            parent,
            task.location.x,
            task.location.y,
        );
        return cell.addTo(this.graph);

        // let source = this.graph.insertVertex(
        //     parent,
        //     task.id.value,
        //     task.name,
        //     task.location.x,
        //     task.location.y,
        //     160,
        //     160,
        //     super.createStyle(),
        // );
        //
        //     controlImage = new mxImage(
        //         'assets/sui/themes/hasli/assets/images/icons/provider/generic/single-node-instance.svg',
        //         20, 20
        //     ),
        //     controlOverlay = new mxCellOverlay(
        //         controlImage,
        //         'frap',
        //         mxConstants.ALIGN_LEFT,
        //         mxConstants.ALIGN_TOP,
        //     );
        // controlOverlay.addListener(
        //     mxEvent.CLICK, (sender, event) => {
        // });
        //
        // controlOverlay.cursor = 'pointer';
        //
        // iconOverlay.addListener(
        //     mxEvent.CLICK,
        //     (sender: any, event: any): void => {
        //         let cell = event.getProperty('cell');
        //         this.graph.setSelectionCell(cell);
        //     });
        //
        //
        // this.graph.addCellOverlay(source, iconOverlay);
        // // this.graph.addCellOverlay(source, controlOverlay);
        //
        // let taskMenu = new TaskMenu(this.graph, source);
        // taskMenu.add(new CloseMenuItem());
        // taskMenu.add(new EditMenuItem());
        // return source;
    }

    private insertTask(graph: mxGraph, parent: Layer, task: Task) {
        this.createSource(task, parent);
        //
        // if (task.successors) {
        //     let model = this.graph.getModel();
        //     for (let skey in task.successors) {
        //         let successor = task.successors[skey],
        //             target: mxCell = model.getCell(skey);
        //         if (!target) {
        //             target = graph.insertVertex(
        //                 parent,
        //                 successor.id.value,
        //                 successor.name,
        //                 successor.location.x,
        //                 successor.location.y,
        //                 120,
        //                 80,
        //                 super.createStyle(),
        //             );
        //         }
        //         graph.insertEdge(
        //             parent,
        //             UUID.randomUUID().value,
        //             null,
        //             source,
        //             target
        //         );
        //     }
        // }


    }

    protected onConnection(source: mxCell,
                           target: mxCell,
                           dropTarget: mxCell): boolean {
        if (source && target) {
            return this.taskManager.connect(source.id, target.id);
        } else {
            return false;
        }
    }

    protected removeCells(cells: mxCell[]) {
        for (let cell of cells) {
            this.taskManager.remove(UUID.fromString(cell.id));
        }
    }

    protected createBuilder(): GBuilder {
        console.log("TASKMANAGER" + this.taskManager);
        return new GBuilder(this.container, this.taskManager);
    }

}