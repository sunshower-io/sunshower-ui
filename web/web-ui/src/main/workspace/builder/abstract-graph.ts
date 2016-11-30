import {
    mxCell,
    mxGraph,
    mxClient,
    mxUtils,
    mxRubberband,
    mxGraphModel,
    mxConstants,
    mxGraphHandler
} from 'mxgraph';

import {Kv} from "../../../utils/objects";

import {Grid} from './grid';
import {PLATFORM} from 'aurelia-pal';

export abstract class AbstractGraph {


    protected container: HTMLElement;

    protected grid: Grid;
    protected graph: mxGraph;

    protected leftVisible: boolean = true;
    protected rightVisible: boolean = true;


    protected leftSidebar: HTMLElement;
    protected rightSidebar: HTMLElement;

    constructor() {
    }

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


    protected configureListeners() {
        PLATFORM.global.addEventListener('resize', this.resizeHandler);
    }

    resizeHandler = () => this.resized();


    detached(): void {
        PLATFORM.global.removeEventListener('resize', this.resizeHandler);
    }

    resized() {
        this.grid.draw();
    }


    protected toggle(ele: HTMLElement, v: boolean, direction: string): boolean {

        let visible = v;
        if (visible) {
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


    protected decorateGraphHandler() {
        let original = mxGraphHandler.prototype.getInitialCellForEvent;
        mxGraphHandler.prototype.getInitialCellForEvent = function (self: mxGraphHandler) {
            let cell = original.apply(this, arguments);
            if (cell.getAttribute('constituent') === '1') {
                return this.graph.getModel().getParent(cell);
            }
            return cell;
        }
    }


    protected configure(g: mxGraph): void {
        g.selectCellForEvent = function (cell: mxCell) {
            if (cell.getAttribute('constituent') === '1') {
                cell = this.model.getParent(cell);
                let args = [cell, arguments[1]];
                mxGraph.prototype.selectCellForEvent.apply(this, args);
            } else {
                mxGraph.prototype.selectCellForEvent.apply(this, arguments);
            }
        };

        g.convertValueToString = function (cell: mxCell) {
            if (mxUtils.isNode(cell.value)) {
                return cell.getAttribute('label');
            }
            return mxGraph.prototype.convertValueToString.apply(this, arguments);
        };


        mxGraph.prototype.hasListener = function (key: string,
                                                  listener: (sender: any, event: any) => void): boolean {
            let listeners = this.mouseListeners;
            return listeners[key] || false;
        }
    }

    protected createStyle(url: string): string {
        return Kv.create(';')
            .pair('shape', 'label')
            .pair('image', `/hasli/api/v1/storage/s3/images/${url}`)
            .pair('imageWidth', 24)
            .pair('imageHeight', 24)
            .pair('fillColor', '#f7f7f7')
            .pair('shadow', 1)
            .pair('fontColor', '#000000')
            .toString();
    }
}