import {
    mxCell,
    mxGraph,
    mxClient,
    mxUtils,
    mxRubberband,
    mxConstants,
    mxGraphHandler,
} from 'mxgraph';


import {PLATFORM} from 'aurelia-pal';
import {Registry} from "utils/registry";
import {Canvas} from 'canvas/core/canvas';

export interface GraphEvent {
    name:string;
}

export class GraphEvents {
    static readonly RESIZED             : string = 'resized';
    static readonly LEFT_CLOSED         : string = 'left-closed';
    static readonly LEFT_OPENED         : string = 'left-opened';
    static readonly RIGHT_CLOSED        : string = 'right-closed';
    static readonly RIGHT_OPENED        : string = 'right-opened';
}

import {Subject} from 'rx';

export abstract class AbstractGraph {


    /**
     * public fields
     */
    public    container         : HTMLElement;
    public leftSidebar          : HTMLElement;
    public leftVisible          : boolean = true;
    public rightVisible         : boolean = true;
    public subject              : Subject<GraphEvent>;

    /**
     * protected fields
     */

    protected graph             : Canvas;



    protected rightSidebar      : HTMLElement;

    /**
     * private fields
     */


    constructor(public registry:Registry) {
        this.subject = new Subject<GraphEvent>();
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

    protected abstract createBuilder() : Canvas;

    protected configureListeners() {
        PLATFORM.global.addEventListener('resize', this.resizeHandler);
    }

    resizeHandler = () => this.resized();


    detached(): void {
        PLATFORM.global.removeEventListener('resize', this.resizeHandler);
    }

    resized() {
        this.subject.next({name: GraphEvents.RESIZED});
        this.graph.redraw();
    }



    prependClass(sel, strClass) {
        var el = $(sel);
        var classes = el.attr('class');
        classes = strClass + ' ' + classes;
        el.attr('class', classes);
    }


    toggleLeft() : boolean {
        this.leftVisible = this.toggle(
            this.leftSidebar,
            this.leftVisible,
            'right'
        );
        let eventType = this.leftVisible ?
            GraphEvents.LEFT_OPENED : GraphEvents.LEFT_CLOSED;
        this.subject.next({name: eventType});
        return this.leftVisible;
    };

    toggleRight() : boolean {
        this.rightVisible = this.toggle(
            this.rightSidebar,
            this.rightVisible,
            'left'
        );
        let eventType = this.rightVisible ?
            GraphEvents.RIGHT_OPENED : GraphEvents.RIGHT_CLOSED;
        this.subject.next({name: eventType});
        return this.rightVisible;
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