import {Layer} from 'mxgraph';
import {inject} from 'aurelia-framework'
import {HttpClient} from "aurelia-fetch-client";
import {createEvent} from "utils/events";
import {ImageDescriptor} from "model/hal/image";

import {Registry} from 'utils/registry'

import {
    EditorOperation,
    EditorContext
} from 'main/workspace/draftboards/editor';


import {ApplicationDeployment} from "component/model/deployment";
import {InfrastructureNode} from "component/model/infrastructure-node";

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
            .then(response => response.json() as any)
            .then(elements => {
                this.elements = elements;
                this.resize();
            });

        $(window).resize(this.resize);
    }

    private resize = () => {
        let top = $(this.element).offset().top,
            wheight = $(window).height(),
            height = wheight - top - 32;
        $(this.element).height(height);
    }
}




class ApplicationProcessor implements EditorOperation {

    constructor(
        private id:string,
        private registry:Registry,
        private coordinates:{x:number, y:number}
    ) {


    }

    resolveParent(context:EditorContext, x:number, y:number) : Layer {
        let graph = context.graph,
            defaultParent = graph.getDefaultParent(),
            parent = graph.getCellAt(x, y, defaultParent, true, false);

        while(parent && !(parent instanceof Node)) {
            parent = parent.parent;
        }

        return parent || defaultParent;
    }


    apply(context: EditorContext): void {
        context.location = {
            x: this.coordinates.x,
            y: this.coordinates.y - context.offset.top
        };
        new ApplicationDeployment(
            this.registry,
            this.id
        ).satisfy(context);
    }
}
