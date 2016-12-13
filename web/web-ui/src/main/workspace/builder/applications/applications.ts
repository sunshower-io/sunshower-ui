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
import {ApplicationDeployment} from "../cells/deployment";
import {AddInfrastructure as AddInfrastructureDialog} from "./components/add-infrastructure";

@inject(
    HttpClient,
    TaskManager,
    Builder,
    Registry
)
export class Applications extends AbstractGraph implements Listener, NavigationAware {

    private infrastructureDialog:AddInfrastructureDialog;
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
        let offset = $(this.graph.container).offset();
        let context = {
                offset: offset,
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


    addInfrastructure(e:Event) : void {
        this.infrastructureDialog.task = (<any>e).detail;
        this.infrastructureDialog.show();
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
        let cell = new ApplicationDeployment (
            this.registry,
            task,
            parent,
            task.location.x,
            task.location.y,
        );
        return cell.addTo(this.graph);
    }

    private insertTask(graph: mxGraph, parent: Layer, task: Task) {
        this.createSource(task, parent);
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
        return new GBuilder(this.container, this.taskManager);
    }

}