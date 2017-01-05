
import {createEvent} from "utils/events";
import {
    Canvas,
    EditorOperation,
    EditorContext
} from "canvas/core/canvas";
import {mxConstants} from "mxgraph";
import {
    mxPoint,
    mxImage,
    mxCellOverlay,
} from "mxgraph";


import {InfrastructureNode} from "component/model/infrastructure-node";



import 'pnotify';
import {Registry} from 'utils/registry';

import {inject} from 'aurelia-framework';

import {Action, ActionManager} from 'canvas/actions/action-service';

@inject(Registry, ActionManager)
export class Palette {

    element:HTMLElement;

    actions: Action[];

    constructor(
        private registry:Registry,
        private actionManager:ActionManager
    ) {
        this.actions = actionManager
            .getActions()
            .filter(action => action.getProperty('palette') === '1');

    }

    attached() : void {


    }

    createNode(e:DragEvent) :void {
        let event = createEvent(
            'palette-event',
            new NodeProcessor(this.coords(e), this.registry),
        );
        this.element.dispatchEvent(event);
    }

    private coords(e:DragEvent) : mxPoint {
        if(e) {
            return {x: e.clientX, y:e.clientY}
        }
        return {x:250, y:250};
    }
}


class NodeProcessor implements EditorOperation {
    constructor(private coordinates:mxPoint, private registry:Registry) {

    }

    apply(context: EditorContext): void {

        let
            parent = context.graph.getDefaultParent(),
            node = new InfrastructureNode();
        node.addTo(context.graph, parent);
    }
}

