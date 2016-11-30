
/**
 * Created by dustinlish on 11/9/16.
 */


import {HttpClient} from "aurelia-fetch-client";
import {inject} from 'aurelia-framework';
import {TaskManager} from "../../../../task/tasks";
import {TaskMenu, EditMenuItem, CloseMenuItem} from "./task-cell-menu";

import {AbstractGraph} from '../abstract-graph'


@inject(HttpClient, TaskManager)
export class Applications extends AbstractGraph {


    constructor(private client: HttpClient, private taskManager: TaskManager) {
        super();
    }


    addTask(event: Event) {
        let graph = this.graph,
            parent = this.graph.getDefaultParent(),
            details = (<any>event).detail,
            offset = $(this.graph.container).offset().top;

        this.client.fetch(`docker/images/${details.value}`)
            .then(r => r.json())
            .then(r => {
                let url = r.logo_url.large;
                graph.getModel().beginUpdate();
                try {
                    var v1 = graph.insertVertex(
                        parent,
                        null,
                        r.name,
                        details.location.x,
                        details.location.y - offset,
                        120,
                        80,
                        super.createStyle(url),
                    );

                    let menu = new TaskMenu(graph, v1);
                    menu.add(new CloseMenuItem());
                    menu.add(new EditMenuItem());

                } finally {
                    graph.getModel().endUpdate();
                }
            });
    }


}