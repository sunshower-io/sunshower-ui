import {Registry} from 'utils/registry';

import {
    mxImage,
    mxCell,
    mxConstants,
    mxCellOverlay
} from "mxgraph";


import {Constrained} from './cell';
import {Canvas} from "canvas/core/canvas";
import {ElementEvent} from 'canvas/element/events';


import {
    Listener,
    ObservedEvent
} from "utils/observer";


import {Kv} from 'utils/objects';
import {EditorContext} from "canvas/core/canvas";
import {RegistryAwareElement} from "canvas/element/registry-aware";
import {InfrastructureNode} from "./infrastructure-node";
import {mxRectangle} from "mxgraph";
import {VertexMenu, NetworkMenuItem} from "canvas/menu/task-cell";
import {mxGeometry} from "mxgraph";


export class ApplicationDeployment extends RegistryAwareElement implements Listener, Constrained {


    icon: string;
    host: Canvas;

    applicationName: string;

    constructor(registry: Registry,
                private applicationId: string) {
        super(
            // UUID.randomUUID(),
            // null,
            // null,
            // 24,
            // 48,
            // 120,
            // 120,
            registry
        );

        this.geometry = new mxGeometry(24, 48, 120, 120);
        this.setAttribute('constituent', '1');
    }


    addTo(builder: Canvas): mxCell {
        this.host = builder;
        this.createMenu(builder);
        // this.addChildren(builder);
        let result = super.addTo(builder);
        return result;
    }

    // private addChildren(builder: Canvas) {
    //     return result;
    // }

    private createMenu(builder: Canvas) {
        // let menu = new VertexMenu(builder, this, '\uf013');
        // menu.addItem(new NetworkMenuItem());
    }


    satisfy(context: EditorContext): void {
        // this.addTo(context.graph);
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
                InfrastructureNode
            ),
            graph = context.graph as Canvas,
            node: InfrastructureNode = null;

        if (parent instanceof InfrastructureNode) {
            node = parent as InfrastructureNode;
        } else {
            node = new InfrastructureNode(this.registry);
            node.satisfy(context);
        }
        this.parent = node;
        node.addApplication(this);
        // this.addTo(graph);
        // this.parent = node;
        // node.addApplication(this);
        // let node = new InfrastructureNode(this.registry);
        //     node.satisfy(context);
        this.load(node);
    }

    protected load(node: InfrastructureNode) {
        this.setLoading();
        this.registry.client.fetch(`docker/images/${this.applicationId}`)
            .then(r => r.json() as any)
            .then(r => {
                this.icon = this.getIconUrl(r);
                this.applicationName = r.name;
                this.host.addCellOverlay(this, this.applicationOverlay());
                // node.data.add(element);
                this.registry.draftboardManager.dispatch(
                    'element-modified',
                    new ElementEvent('element-modified', node)
                );
            });
        this.stopLoading();
    }

    private getIconUrl(r: any): string {
        return `${this.registry.get(Registry.S3_IMAGES_PATH)}/${r.logo_url.large}`;
    }

    protected applicationOverlay(): mxCellOverlay {
        let
            url = this.icon,
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


