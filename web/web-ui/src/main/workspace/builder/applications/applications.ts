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

import {mxGraph, Layer, mxCell} from "mxgraph";
import {AbstractGraph} from '../abstract-graph'
import {UUID} from "../../../../utils/uuid";
import {Router} from "aurelia-router";

@inject(HttpClient, TaskManager, Router)
export class Applications extends AbstractGraph implements Listener {

    constructor(private client: HttpClient,
                private taskManager: TaskManager,
                private router:Router
    ) {
        super();
        taskManager.addEventListener('task-added', this);
        taskManager.addEventListener('cycle-detected', this);
    }


    attached(): void {
        super.attached();
        this.insertTasks(this.taskManager.getTasks());
        (<SidebarAware>)this.router
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

    private insertTask(graph: mxGraph, parent: Layer, task: Task) {
        var source = graph.insertVertex(
            parent,
            task.id.value,
            task.name,
            task.location.x,
            task.location.y,
            120,
            80,
            super.createStyle(task.icon),
        );

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
                        super.createStyle(successor.icon),
                    );
                }
                console.log(`SID: ${source.id} TID: ${target.id}`);
                graph.insertEdge(
                    parent,
                    UUID.randomUUID().value,
                    null,
                    source,
                    target
                );
                let menu = new TaskMenu(graph, target);
                menu.add(new CloseMenuItem());
                menu.add(new EditMenuItem());
            }
        }

        let menu = new TaskMenu(graph, source);
        menu.add(new CloseMenuItem());
        menu.add(new EditMenuItem());


    }

    protected onConnection(source: mxCell,
                           target: mxCell,
                           dropTarget: mxCell): boolean {
        if (source && target) {
            console.log(`SID: ${source.id}, ${target.id}`);
            return this.taskManager.connect(source.id, target.id);
        } else {
            return false;
        }
    }

}