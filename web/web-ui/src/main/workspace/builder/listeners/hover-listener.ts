import {
    mxGraph,
    mxCellState,
    mxMouseEvent,
    MouseListener,
    mxUtils,
    Style
} from "mxgraph";
import {templateController} from "aurelia-templating";
import {mxConstants} from "mxgraph";

export class HoverListenerAdapter implements MouseListener {
    mouseMove(sender: mxGraph, event: mxMouseEvent): void {
    }

    mouseUp(sender: mxGraph, event: mxMouseEvent): void {

    }

    mouseDown(sender: mxGraph, event: mxMouseEvent): void {

    }
}


export class MenuHoverListener extends HoverListenerAdapter {

    previousStyle: Style;
    currentState: mxCellState;

    constructor(private graph:mxGraph) {
        super();
    }

    updateStyle(state, hover) {
        if(hover) {
            state.style[mxConstants.STYLE_FILLCOLOR] = '#239ae8';
            state.style['fillOpacity'] = 10;
        }
    }

    mouseDown(sender: mxGraph, me: mxMouseEvent) {
        if (this.currentState != null) {
            this.dragLeave(me.getEvent(), this.currentState);
            this.currentState = null;
        }
    }


    mouseMove(sender: mxGraph, me: mxMouseEvent) {
        if (
            this.currentState != null &&
            me.getState() == this.currentState
        ) {
            return;
        }
        let graph = this.graph;


        let tmp = graph.view.getState(me.getCell());

        if (graph.isMouseDown || (tmp != null &&
            !graph.getModel().isVertex(tmp.cell))) {
            tmp = null;
        }

        if (tmp != this.currentState) {
            if (this.currentState != null) {
                this.dragLeave(me.getEvent(), this.currentState);
            }

            this.currentState = tmp;

            if (this.currentState != null) {
                this.dragEnter(me.getEvent(), this.currentState);
            }
        }
    }

    mouseUp(sender, me) {
    }

    dragEnter(evt, state) {
        if (state != null) {
            this.previousStyle = state.style;
            state.style = mxUtils.clone(state.style);
            this.updateStyle(state, true);
            state.shape.apply(state);
            state.shape.redraw();

            if (state.text != null) {
                state.text.apply(state);
                state.text.redraw();
            }
        }
    }

    dragLeave(evt, state) {
        if (state != null) {
            state.style = this.previousStyle;
            this.updateStyle(state, false);
            state.shape.apply(state);
            state.shape.redraw();

            if (state.text != null) {
                state.text.apply(state);
                state.text.redraw();
            }
        }
    }
}
