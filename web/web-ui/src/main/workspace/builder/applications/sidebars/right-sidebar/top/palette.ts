
import {createEvent} from "utils/events";
import {
    GraphProcessor,
    GraphContext
} from "main/workspace/builder/abstract-graph";
import {mxConstants} from "mxgraph";
import {
    mxPoint,
    mxImage,
    mxCellOverlay,
} from "mxgraph";

import {InfrastructureElement} from 'elements/elements';

import {Node} from "main/workspace/builder/cells/node";



import 'pnotify';
import {Registry} from 'utils/registry';
import {Builder} from "../../../../graph/builder";

import {inject} from 'aurelia-framework';

@inject(Registry)
export class Palette {

    element:HTMLElement;

    constructor(private registry:Registry) {

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


class NodeProcessor implements GraphProcessor {
    constructor(private coordinates:mxPoint, private registry:Registry) {

    }

    apply(context: GraphContext): void {

        let
            parent = context.graph.getDefaultParent(),
            ie = new InfrastructureElement(),
            node = new Node(
                parent,
                ie,
                this.coordinates.x,
                this.coordinates.y - context.offset.top,
                this.registry
            );
        node.addTo(context.graph as Builder);
    }
}

