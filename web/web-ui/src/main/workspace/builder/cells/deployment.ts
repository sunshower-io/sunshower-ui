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


import {
    Application
} from 'elements/elements';

import {mxEvent} from "mxgraph";

import {
    Listener,
    ObservedEvent
} from "utils/observer";

import {Kv} from 'utils/objects';



export class ApplicationDeployment extends AbstractVertex<Application> implements Listener {

    host: Builder;
    constructor(registry: Registry,
                element: Application,
                parent: Layer,
                x: number,
                y: number) {
        super(
            element.id,
            element, parent, x, y, 120, 120, registry);
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

    // protected addOperatingSystemOverlay(): mxCellOverlay {
    //     // let
    //     //     url = `assets/sui/themes/hasli/assets/images/logos/os/${this.data.deploymentTarget.operatingSystem.icon}`,
    //     //     image = new mxImage(url, 24, 24),
    //     //     iconOverlay = new mxCellOverlay(
    //     //         image,
    //     //         null,
    //     //         mxConstants.ALIGN_RIGHT,
    //     //         mxConstants.ALIGN_TOP,
    //     //         {x: -14, y: 14},
    //     //         // null,
    //     //         'default'
    //     //     );
    //     // return iconOverlay;
    // }


    protected applicationOverlay(): mxCellOverlay {
        let
            url = `${this.registry.get(Registry.S3_IMAGES_PATH)}/${this.data.icon}`,
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
        results.push(this.applicationOverlay());
        // if (
        //     this.data.deploymentTarget &&
        //     this.data.deploymentTarget.operatingSystem) {
        //     results.push(this.addOperatingSystemOverlay());
        // }

        return results;
    }

    apply(event: ObservedEvent): void {

    }

    // apply(event: ObservedEvent): void {
    //     this.host.addCellOverlay(this, this.addOperatingSystemOverlay());
    // }

    protected createCss() : Kv {
        let result = super
            .createCss()
            .pair('strokeColor', '#DFDFDF');
        console.log(result.toString());
        return result;
    }
}


