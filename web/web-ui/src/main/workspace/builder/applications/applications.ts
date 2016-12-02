/**
 * Created by dustinlish on 11/9/16.
 */


import {
    InfrastructureDescriptor
} from "../../../../task/infrastructure";

import {
    Task,
    TaskManager
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

@inject(HttpClient, TaskManager)
export class Applications extends AbstractGraph implements Listener {

    constructor(private client: HttpClient,
                private taskManager: TaskManager) {
        super();
        taskManager.addEventListener('task-added', this);
    }


    attached(): void {
        super.attached();
        this.insertTasks(this.taskManager.getTasks());
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

    apply(event: ObservedEvent): void {
        let task = event.target,
            tasks = [].concat(task as Task);

        this.insertTasks(tasks);
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
        var v1 = graph.insertVertex(
            parent,
            task.id.toString(),
            task.name,
            task.location.x,
            task.location.y,
            120,
            80,
            super.createStyle(task.icon),
        );

        let menu = new TaskMenu(graph, v1);
        menu.add(new CloseMenuItem());
        menu.add(new EditMenuItem());

    }

    protected onConnection(
        source: mxCell,
        target: mxCell,
        dropTarget: mxCell
    ): boolean {
        return this.taskManager.connect(source.id, target.id);
    }

}