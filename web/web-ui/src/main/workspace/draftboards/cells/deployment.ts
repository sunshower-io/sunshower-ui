import {Registry} from 'utils/registry';

import {AbstractVertex} from "../graph/vertex";
import {
    Layer,
    mxImage,
    mxCell,
    mxConstants,
    mxCellOverlay
} from "mxgraph";

import {Builder} from "../graph/builder";

import {Constrained} from './cell';


import {ElementEvent} from 'elements/events';

import {
    ApplicationElement,
    InfrastructureElement
} from 'elements/elements';

import {Node} from './node'


import {mxEvent} from "mxgraph";

import {
    Listener,
    ObservedEvent
} from "utils/observer";

import {UUID} from 'utils/uuid';

import {Kv} from 'utils/objects';
import {EditorContext} from "../editor";


export class ApplicationDeployment extends AbstractVertex<ApplicationElement> implements Listener, Constrained {

    icon: string;
    host: Builder;

    constructor(registry: Registry,
                private applicationId: string) {
        super(
            UUID.randomUUID(),
            null,
            null,
            24,
            48,
            120,
            120,
            registry
        );
        this.setAttribute('constituent', '1');
    }


    addTo(builder: Builder): mxCell {
        this.createMenu(builder);
        return this.addChildren(builder);
    }

    private addChildren(builder: Builder) {
        this.host = builder;
        let result = super.addTo(builder);
        return result;
    }

    private createMenu(builder: Builder) {
        // let menu = new VertexMenu(builder, this, '\uf013');
        // menu.addItem(new NetworkMenuItem());
    }


    satisfy(context: EditorContext): void {
        try {
            context.graph.getModel().beginUpdate();
            this.doSatisfy(context);
        } finally {
            context.graph.getModel().endUpdate();
        }
    }

    private doSatisfy(context: EditorContext) {
        let location = context.location,
            parent = this.resolveParent(
                context,
                location.x,
                location.y,
                Node
            ),
            graph = context.graph as Builder,
            node: Node = null;

        if (parent instanceof Node) {
            node = parent as Node;
        } else {
            let infrastructureElement = new InfrastructureElement();
            node = new Node(
                parent,
                infrastructureElement,
                location.x,
                location.y - context.offset.top,
                this.registry
            );
            node.satisfy(context);
        }
        this.parent = node;
        node.addApplication(this);
        this.load(node);
    }

    protected load(node: Node) {
        this.setLoading();
        this.registry.client.fetch(`docker/images/${this.applicationId}`)
            .then(r => r.json() as any)
            .then(r => {
                let element = new ApplicationElement(
                    this.getIconUrl(r), r.name, this.applicationId
                );
                this.data = element;
                this.host.addCellOverlay(this, this.applicationOverlay());
                node.data.add(element);
                this.registry.elementManager.dispatch(
                    'element-modified',
                    new ElementEvent('element-modified', node.data)
                );
            });
        this.stopLoading();
    }

    private getIconUrl(r: any): string {
        return `${this.registry.get(Registry.S3_IMAGES_PATH)}/${r.logo_url.large}`;
    }

    protected applicationOverlay(): mxCellOverlay {
        let
            url = this.data.icon,
            image = new mxImage(url, 40, 40),
            iconOverlay = new mxCellOverlay(
                image,
                null,
                mxConstants.ALIGN_CENTER,
                mxConstants.ALIGN_MIDDLE,
                null,
                'default'
            );
        return iconOverlay;
    }


    protected createOverlays(): mxCellOverlay[] {
        let results = [];
        // results.push(this.applicationOverlay());
        return results;
    }

    apply(event: ObservedEvent): void {

    }


    protected createCss(): Kv {
        let result = super
            .createCss()
            .pair('strokeColor', '#DFDFDF');
        console.log(result.toString());
        return result;
    }
}


