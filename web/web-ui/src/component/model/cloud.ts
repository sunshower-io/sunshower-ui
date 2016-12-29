

import {
    mxCellOverlay,
    mxConstants,
    mxImage

} from "mxgraph";


import {Constrained} from "./cell";

import {EditorContext} from "canvas/core/canvas";
import {AbstractElement} from "canvas/element/element";

export class VirtualCloud extends AbstractElement implements Constrained {

    constructor() {
        super();
        this.setAncestor(true);
        this.setCollapsable(true);
        this.name = 'VPC 0';
        this.icon = 'assets/sui/themes/hasli/assets/images/icons/provider/generic/cloud.svg';
    }


    regroup() : void {
        let geo = this.geometry,
            x = geo.x,
            y = geo.y;
        if(this.children && this.children.length === 1) {
            let child = this.children[0],
                cx = child.geometry.x,
                cy = child.geometry.y;
            x = cx;
            y = cy;
        }
        // this.host.groupCells(this, 20, this.children);
        this.geometry.x = x;
        this.geometry.y = y;
        this.host.refresh(this);
    }

    satisfy(context: EditorContext): void {

    }

    protected createCloudOverlay() : mxCellOverlay {
        let
            url = `assets/sui/themes/hasli/assets/images/icons/provider/generic/cloud.svg`,
            image = new mxImage(url, 30, 20),
            iconOverlay = new mxCellOverlay(
                image,
                null,
                mxConstants.ALIGN_LEFT,
                mxConstants.ALIGN_TOP,
                null,
                'default'
            );
        return iconOverlay;

    }

    protected createOverlays(): mxCellOverlay[] {
        return [this.createCloudOverlay()];
    }

}