import {VirtualCloud as VPC} from 'elements/cloud';
import {LayeredNode} from "./layer";
import {Constrained} from "./cell";
import {EditorContext} from "../editor";

import {mxCellOverlay, mxConstants, mxImage} from "mxgraph";

export class VirtualCloud extends LayeredNode<VPC> implements Constrained {
    constructor() {
        super(null, null, 0, 0);
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