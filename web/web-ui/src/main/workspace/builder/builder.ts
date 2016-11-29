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
import {mxConstants} from "mxgraph";


@inject(HttpClient, TaskManager)
export class Builder {

    private sidebar;
    graph: mxGraph;

    grid: Grid;
    container: HTMLElement;

    private leftVisible: boolean = true;
    private rightVisible: boolean = true;
    private expanded: number = 2;
    private states: {[key: number]: string} = {};


    private leftSidebar: HTMLElement;
    private rightSidebar: HTMLElement;

    constructor(private client:HttpClient, private taskManager:TaskManager) {
        this.states[2] = "ten";
        this.states[0] = "sixteen";
        this.states[1] = "thirteen";
    }

    resizeHandler = () => this.resized();

    attached() {

        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('Browser is not supported!', 200, false);
        }
        else {
            mxConstants.HANDLE_FILLCOLOR = '#239AE8';
            mxConstants.HANDLE_STROKECOLOR = '#239AE8';
            mxConstants.VERTEX_SELECTION_COLOR = '#0000FF';
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
            location = (<any>details).location,
            offset = $(this.graph.container).offset().top;

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
                        details.location.y - offset,
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


    toggleLeft() {
        this.leftVisible = this.toggle(
            this.leftSidebar,
            this.leftVisible,
            'right'
        );
    };

    toggleRight() {
        this.rightVisible = this.toggle(
            this.rightSidebar,
            this.rightVisible,
            'left'
        );

    }

    private computeExpanded(visible: boolean) {
        return visible ? -1 : 1;
    }

    private toggle(ele:HTMLElement, v :boolean, direction:string) :boolean {

        let visible = v,
            expanded = this.computeExpanded(visible),
            previous = this.states[this.expanded],
            next = this.states[this.expanded + expanded];
        $(this.graph).removeClass(previous);
        console.log("previous", previous);
        this.prependClass(this.graph, next);
        console.log("next", next);
        if(visible) {
            visible = false;
            $(ele).hide();
        } else {
            visible = true;
            $(ele).show();
        }
        this.expanded += expanded;

        return visible;
    }

    prependClass(sel, strClass) {
        var el = $(sel);
        var classes = el.attr('class');
        classes = strClass + ' ' + classes;
        el.attr('class', classes);
    }


}
