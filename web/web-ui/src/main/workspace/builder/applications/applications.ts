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

import {
    TaskMenu,
    EditMenuItem,
    CloseMenuItem
} from "./../task-cell-menu";

import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";

import {
    mxGraph,
    Layer,
    mxCell,
    mxCellOverlay,
    mxImage,
    mxEvent
} from "mxgraph";

import {AbstractGraph, GraphContext, GraphProcessor} from '../abstract-graph'
import {UUID} from "../../../../utils/uuid";

import {
    Builder, NavigationAware
} from '../builder';
import {mxConstants} from "mxgraph";

@inject(HttpClient, TaskManager, Builder)
export class Applications extends AbstractGraph implements Listener, NavigationAware {

    constructor(private client: HttpClient,
                private taskManager: TaskManager,
                private parent:Builder,
    ) {
        super();
        taskManager.addEventListener('task-added', this);
        taskManager.addEventListener('cycle-detected', this);
    }


    attached(): void {
        super.attached();
        this.insertTasks(this.taskManager.getTasks());
        this.parent.set(this);
    }


    modifyGraph(event:Event) {
        let context = {
            graph:this.graph
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


    handleCycle(cycleEvent: CycleDetectedEvent) {
        alert("Psycles :(");
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

    // todo: cleanup
    private insertTask(graph: mxGraph, parent: Layer, task: Task) {
        let source = graph.insertVertex(
            parent,
            task.id.value,
            task.name,
            task.location.x,
            task.location.y,
            160,
            160,
            super.createStyle(),
        );

        let image = new mxImage(super.url(task.icon), 40, 40),
            iconOverlay = new mxCellOverlay(
                image,
                'frap',
                mxConstants.ALIGN_CENTER,
                mxConstants.ALIGN_MIDDLE
            ),
            controlImage = new mxImage(
                'assets/sui/themes/hasli/assets/images/icons/provider/generic/single-node-instance.svg',
                20, 20
            ),
            controlOverlay = new mxCellOverlay(
                controlImage,
                'frap',
                mxConstants.ALIGN_LEFT,
                mxConstants.ALIGN_TOP
            );


        iconOverlay.addListener(
            mxEvent.CLICK,
            (sender:any, event:any) : void => {
            let cell = event.getProperty('cell');
            graph.setSelectionCell(cell);
        });


        this.graph.addCellOverlay(source, iconOverlay);
        this.graph.addCellOverlay(source, controlOverlay);


        if (task.successors) {
            let model = this.graph.getModel();
            for (let skey in task.successors) {
                let successor = task.successors[skey],
                    target: mxCell = model.getCell(skey);
                if (!target) {
                    target = graph.insertVertex(
                        parent,
                        successor.id.value,
                        successor.name,
                        successor.location.x,
                        successor.location.y,
                        120,
                        80,
                        super.createStyle(),
                    );
                }
                graph.insertEdge(
                    parent,
                    UUID.randomUUID().value,
                    null,
                    source,
                    target
                );
            }
        }


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

}