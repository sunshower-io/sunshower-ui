
import {createEvent} from "utils/events";
import {
    EditorOperation,
    EditorContext
} from "main/workspace/draftboards/editor";
import {mxConstants} from "mxgraph";
import {
    mxPoint,
    mxImage,
    mxCellOverlay,
} from "mxgraph";

import {InfrastructureElement} from 'elements/elements';

import {Node} from "main/workspace/draftboards/cells/node";



import 'pnotify';
import {Registry} from 'utils/registry';
import {Builder} from "main/workspace/draftboards/graph/builder";

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


class NodeProcessor implements EditorOperation {
    constructor(private coordinates:mxPoint, private registry:Registry) {

    }

    apply(context: EditorContext): void {

        let
            parent = context.graph.getDefaultParent(),
            ie = new InfrastructureElement(null),
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

