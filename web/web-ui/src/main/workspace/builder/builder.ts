/**
 * Created by dustinlish on 11/9/16.
 */
import {
    mxCell,
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
import {TaskMenu, EditMenuItem, CloseMenuItem} from "./task-cell-menu";
import {mxGraphHandler} from "mxgraph";
import {mxStylesheet} from "mxgraph";


@inject(HttpClient, TaskManager)
export class Builder {

    private sidebar;
    graph: mxGraph;

    grid: Grid;
    container: HTMLElement;

    private leftVisible: boolean = true;
    private rightVisible: boolean = true;


    private leftSidebar: HTMLElement;
    private rightSidebar: HTMLElement;

    private namedDelegates:{[slot:string]:Function};


    constructor(private client:HttpClient, private taskManager:TaskManager) {
        this.namedDelegates = {};
    }

    resizeHandler = () => this.resized();

    attached() {

        this.decorateGraphHandler();

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

            this.configure(graph);
            graph.gridSize = 40;
            graph.setPanning(true);
            graph.setConnectable(true);
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
                    .pair('fontColor', '#000000')
                    .toString();
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
                        style
                    );

                    let menu = new TaskMenu(graph, v1);
                    menu.add(new CloseMenuItem());
                    menu.add(new EditMenuItem());

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

        let visible = v;
        if(visible) {
            visible = false;
            $(ele).hide();
        } else {
            visible = true;
            $(ele).show();
        }
        return visible;
    }

    prependClass(sel, strClass) {
        var el = $(sel);
        var classes = el.attr('class');
        classes = strClass + ' ' + classes;
        el.attr('class', classes);
    }


    protected decorateGraphHandler() {
        let original = mxGraphHandler.prototype.getInitialCellForEvent;
        mxGraphHandler.prototype.getInitialCellForEvent = function(self:mxGraphHandler) {
            let cell = original.apply(this, arguments);
            if(cell.getAttribute('constituent') === '1') {
                return this.graph.getModel().getParent(cell);
            }
            return cell;
        }
    }


    protected configure(g:mxGraph) : void {
        g.selectCellForEvent = function(cell:mxCell) {
            if(cell.getAttribute('constituent') === '1') {
                cell = this.model.getParent(cell);
                let args = [cell, arguments[1]];
                mxGraph.prototype.selectCellForEvent.apply(this, args);
            } else {
                mxGraph.prototype.selectCellForEvent.apply(this, arguments);
            }
        };

        g.convertValueToString = function(cell:mxCell) {
            if(mxUtils.isNode(cell.value)) {
                return cell.getAttribute('label');
            }
            return mxGraph.prototype.convertValueToString.apply(this, arguments);
        }


        mxGraph.prototype.hasListener = function(
            key:string,
            listener:(sender:any, event:any) => void
        ) : boolean {
            let listeners = this.mouseListeners;
            return listeners[key] || false;
        }
    }


    protected createStylesheet() : mxStylesheet {

        let ss = new mxStylesheet();

        let dvss = {};
        dvss[mxConstants.STYLE_FONTFAMILY] = 'FontAwesome';
        dvss[mxConstants.STYLE_FONTSTYLE] = 'normal';
        dvss[mxConstants.VERTEX_SELECTION_COLOR] = '#FF0000';
        ss.putDefaultVertexStyle(dvss);
        return ss;
    }


}
