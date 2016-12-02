/**
 * Created by dustinlish on 11/9/16.
 */


import {HttpClient} from "aurelia-fetch-client";
import {inject} from 'aurelia-framework';
import {
    Task,
    TaskManager
} from "../../../../task/tasks";

import {mxCell} from 'mxgraph';



import {AbstractGraph} from '../abstract-graph'
import {InfrastructureDescriptor} from "../../../../task/infrastructure";


@inject(HttpClient, TaskManager)
export class Infrastructure extends AbstractGraph {

    constructor(
        private client: HttpClient,
        private taskManager: TaskManager
    ) {
        super();
    }


    attached() : void {
        super.attached();
        this.addDeploymentTargets(this.taskManager.getTasks());
    }

    private addDeploymentTargets(tasks: Task[]) : void {
        this.graph.getModel().beginUpdate();
        try {
            for (let task of tasks) {
                for (let deployment of task.deploymentTargets) {
                    this.addDeploymentTarget(task, deployment);

                }
            }
        } finally {
            this.graph.getModel().endUpdate();
        }
    }

    private addDeploymentTarget(task:Task, deployment: InfrastructureDescriptor) {

        let parent =
            this.graph.getDefaultParent();

        let node = this.graph.insertVertex(
            parent,
            null,
            "whatever",
            task.location.x,
            task.location.y,
            120, 80
        );

    }

    protected onConnection(source: mxCell, target: mxCell, dropTarget: mxCell): boolean {
        return false;
    }

}
