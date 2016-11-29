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


@inject(HttpClient)
export class Builder {

    graph: mxGraph;

    grid: Grid;
    container: HTMLElement;

    resizeHandler = () => this.resized();

    attached() : void {
        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('Browser is not supported!', 200, false);
        }
        else {
            mxRubberband.defaultOpacity = 1;
            mxEvent.disableContextMenu(this.container);
            let graph = new mxGraph(this.container, new mxGraphModel()),
                select = new mxRubberband(graph),
                parent = graph.getDefaultParent(),
                grid = new Grid(graph);
            graph.gridSize = 40;
            graph.getModel().beginUpdate();
            try {
                var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 100, 100);
                var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
                var e1 = graph.insertEdge(parent, null, '', v1, v2);
            } finally {
                graph.getModel().endUpdate();
            }
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

    private configureListeners() {
        PLATFORM.global.addEventListener('resize', this.resizeHandler);
    }
}
