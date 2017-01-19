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


import {Class} from "lang/class";
import {Layer} from "mxgraph";
import {mxGeometry} from "mxgraph";
import {Kv} from 'utils/objects';
import {RegistryAwareElement} from "canvas/element/registry-aware";
import {InfrastructureNode} from "./infrastructure-node";
import {EditableElement} from "canvas/element/element";
import {ApplicationDeploymentEditor} from "component/editors/deployment/editor";


export class ApplicationDeployment extends
    RegistryAwareElement
implements EditableElement<
    ApplicationDeployment,
    ApplicationDeploymentEditor
>, Listener
{

    icon: string;
    host: Canvas;

    applicationId           : string;
    applicationName         : string;
    editor                  : Class<ApplicationDeploymentEditor> = ApplicationDeploymentEditor;

    constructor() {
        super();
        this.geometry = new mxGeometry(0, 0, 100, 100);
        this.setAttribute('constituent', '1');
        this.setAttribute('no-extend-parent', '1');
    }


    copy() : ApplicationDeployment {
        let copy = new ApplicationDeployment();
        copy.geometry = this.geometry.clone();
        // console.log("APPX", this.geometry.x, this.geometry.y);
        // console.log("OFFSET", this.geometry.offset.x, this.geometry.offset.y);
        copy.applicationId = this.applicationId;
        copy.icon = this.icon;
        return copy;
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


