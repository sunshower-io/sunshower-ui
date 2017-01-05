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
import {mxGeometry} from "mxgraph";
import {Layer} from "mxgraph";


export class ApplicationDeployment extends
    RegistryAwareElement
implements
    Listener
{

    icon: string;
    host: Canvas;

    applicationId           : string;
    applicationName         : string;

    constructor() {
        super();
        this.geometry = new mxGeometry(0, 0, 100, 100);
        this.setAttribute('constituent', '1');
    }



    addTo(canvas:Canvas, parent:Layer, relative:boolean) : Layer {
        super.addTo(canvas, parent, relative);
        this.load(parent as InfrastructureNode);
        return this;
    }


    protected load(node: InfrastructureNode) {
        this.setLoading();
        this.registry.client.fetch(`docker/images/${this.applicationId}`)
            .then(r => r.json() as any)
            .then(r => {
                this.icon = this.getIconUrl(r);
                this.applicationName = r.name;
                this.name = r.name;
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
        return result;
    }


}


