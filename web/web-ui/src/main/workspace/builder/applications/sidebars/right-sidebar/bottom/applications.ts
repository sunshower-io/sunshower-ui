import {inject} from 'aurelia-framework'
import {HttpClient} from "aurelia-fetch-client";
import {createEvent} from "utils/events";
import {ImageDescriptor} from "model/hal/image";

import {Node} from "main/workspace/builder/cells/node";
import {Builder} from "main/workspace/builder/graph/builder";
import {Registry} from 'utils/registry'

import {
    GraphProcessor,
    GraphContext
} from "main/workspace/builder/abstract-graph";


import {Layer} from 'mxgraph';

@inject(HttpClient, Registry)
export class Applications {

    private element:HTMLElement;

    private elements: ImageDescriptor[];

    constructor(
        private client:HttpClient,
        private registry:Registry
    ) {

    }


    addImage(id:string, e:DragEvent) {
        let event = createEvent('palette-event',
            new ApplicationProcessor(
                    id,
                    this.registry,
                    {x:e.clientX, y:e.clientY},
                ));
        this.element.dispatchEvent(event);
    }



    public attached(): void {
        this.client.fetch('docker/images')
            .then(response => response.json())
            .then(elements => {
                this.elements = elements;
                let top = $(this.element).offset().top,
                    wheight = $(window).height(),
                    height = wheight - top - 56;
                $(this.element).height(height);
            });
    }
}


class ApplicationProcessor implements GraphProcessor {

    constructor(
        private id:string,
        private registry:Registry,
        private coordinates:{x:number, y:number}
    ) {


    }

    resolveParent(context:GraphContext, x:number, y:number) : Layer {
        let graph = context.graph,
            defaultParent = graph.getDefaultParent(),
            parent = graph.getCellAt(x, y, defaultParent, true, false);

        while(parent && !(parent instanceof Node)) {
            parent = parent.parent;
        }

        return parent || defaultParent;
    }


    apply(context: GraphContext): void {
        let
            x = this.coordinates.x,
            y = this.coordinates.y - context.offset.top,
            parent = this.resolveParent(context, x, y),
            node : Node = null,
            addRelative = false;

        if(parent instanceof Node) {
            node = parent as Node;
            addRelative = true;
        } else {
            node = new Node(
                parent,
                this.coordinates.x,
                this.coordinates.y - context.offset.top,
                this.registry
            );
            node.addTo(context.graph as Builder);
        }
        node.addApplicationById(this.id);
    }
}
