/**
 * Created by dustinlish on 11/9/16.
 */
import {
    mxGraph,
    mxClient,
    mxUtils,
    mxEvent,
    mxRubberband,
    mxGraphModel
} from 'mxgraph';

import {PLATFORM} from 'aurelia-pal';
import {HttpClient} from "aurelia-fetch-client";
import {inject, bindable} from 'aurelia-framework';
import {Grid} from "./grid";
import {TaskManager} from "../../../task/tasks";
import {Kv} from "../../../utils/objects";


@inject(HttpClient, TaskManager)
export class Builder {

    graph: mxGraph;

    grid: Grid;
    container: HTMLElement;

    resizeHandler = () => this.resized();

    constructor(private client:HttpClient, private taskManager:TaskManager) {
        console.log("Task manager", taskManager);
    }

    attached() : void {
        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('Browser is not supported!', 200, false);
        }
        else {
            mxRubberband.defaultOpacity = 1;
            // mxEvent.disableContextMenu(this.container);
            let graph = new mxGraph(this.container, new mxGraphModel()),
                select = new mxRubberband(graph),
                grid = new Grid(graph);
            graph.gridSize = 40;
            this.grid = grid;
            this.grid.draw();
            this.graph = graph;
            this.configureListeners();
        }

    }

    detached() : void {
        PLATFORM.global.removeEventListener('resize', this.resizeHandler);
    }


    resized() {
        this.grid.draw();
    }


    addTask(event:Event) {
        let graph = this.graph,
            parent = this.graph.getDefaultParent(),
            details = (<any>event).detail,
            location = (<any>details).location;

        this.client.fetch(`docker/images/${details.value}`)
            .then(r => r.json())
            .then(r => {
                let url = r.logo_url.large;
                let style = Kv.create(';')
                    .pair('shape', 'label')
                    .pair('image', `/hasli/api/v1/storage/s3/images/${url}`)
                    .pair('imageWidth', 24)
                    .pair('imageHeight', 24)
                    .pair('fillColor', '#f7f7f7')
                    .pair('shadow', 1)
                    .toString();
                console.log("Style", style);
                graph.getModel().beginUpdate();
                try {
                    var v1 = graph.insertVertex(
                        parent,
                        null,
                        'whatever',
                        details.location.x,
                        details.location.y,
                        100,
                        40,
                        style
                    )
                } finally {
                    graph.getModel().endUpdate();
                }
            });
    }

    private configureListeners() {
        PLATFORM.global.addEventListener('resize', this.resizeHandler);
    }
}
