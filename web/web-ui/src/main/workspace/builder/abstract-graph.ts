import {
    mxCell,
    mxGraph,
    mxClient,
    mxUtils,
    mxRubberband,
    mxConstants,
    mxGraphHandler,
} from 'mxgraph';

import {Kv} from "utils/objects";

import {PLATFORM} from 'aurelia-pal';
import {Builder} from './graph/builder';
import {Registry} from "utils/registry";

export interface GraphContext {
    graph:mxGraph;
    offset: {top:number, left:number},
}

export interface GraphProcessor {
    apply(context:GraphContext) : void;
}

export interface GraphModificationEvent {
    processor:GraphProcessor;
}

export abstract class AbstractGraph {



    protected graph: Builder;

    protected container: HTMLElement;

    protected leftVisible: boolean = true;
    protected rightVisible: boolean = true;


    protected leftSidebar: HTMLElement;
    protected rightSidebar: HTMLElement;

    constructor(public registry:Registry) {

    }



    attached() {
        this.decorateGraphHandler();

        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('Browser is not supported!', 200, false);
        }
        else {
            // mxEvent.disableContextMenu(this.container);
            let graph = this.createBuilder();
            this.configureListeners();
            this.graph = graph;
        }
    }

    protected abstract createBuilder() : Builder;

    protected configureListeners() {
        PLATFORM.global.addEventListener('resize', this.resizeHandler);
    }

    resizeHandler = () => this.resized();


    detached(): void {
        PLATFORM.global.removeEventListener('resize', this.resizeHandler);
    }

    resized() {
        this.graph.redraw();
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


    protected url(url:string) : string {
        return `/hasli/api/v1/storage/s3/images/${url}`;
    }
}