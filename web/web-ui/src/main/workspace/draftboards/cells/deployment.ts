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
    ApplicationElement
} from 'elements/elements';

import {mxEvent} from "mxgraph";

import {
    Listener,
    ObservedEvent
} from "utils/observer";

import {Kv} from 'utils/objects';



export class ApplicationDeployment extends AbstractVertex<ApplicationElement> implements Listener {

    icon:string;
    host: Builder;
    constructor(registry: Registry,
                element: ApplicationElement,
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
        results.push(this.applicationOverlay());
        return results;
    }

    apply(event: ObservedEvent): void {

    }


    protected createCss() : Kv {
        let result = super
            .createCss()
            .pair('strokeColor', '#DFDFDF');
        console.log(result.toString());
        return result;
    }
}


