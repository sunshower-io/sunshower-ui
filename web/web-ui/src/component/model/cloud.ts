

import {
    mxImage,
    mxGeometry,
    mxConstants,
    mxCellOverlay

} from "mxgraph";


import {Constrained} from "./cell";

import {Registry} from "utils/registry";
import {EditorContext, Canvas} from "canvas/core/canvas";
import {RegistryAwareElement} from "canvas/element/registry-aware";
import {VirtualCloudEditor} from "component/editors/cloud/editor";
import {Class} from "lang/class";

import {
    EditableElement,
} from "canvas/element/element";

export class VirtualCloud extends
    RegistryAwareElement
    implements
        Constrained ,
        EditableElement<VirtualCloud, VirtualCloudEditor>
{

    editor: Class<VirtualCloudEditor> = VirtualCloudEditor;

    constructor() {
        super();
        this.setAncestor(true);
        this.setCollapsable(true);
        this.name = 'VPC 0';
        this.icon = 'assets/sui/themes/hasli/assets/images/icons/provider/generic/cloud.svg';
        this.geometry = new mxGeometry(0, 0, 100, 100);
    }


    regroup() : void {
        this.host.refresh(this);
        let bb = this.host.getBoundingBox(this.children);
        if(bb) {
            let
                geometry = this.geometry,
                x = Math.min(bb.x, geometry.x),
                y = Math.min(bb.y, geometry.y),
                width = Math.max(bb.width, geometry.width + 64),
                height = Math.max(bb.height, geometry.height + 64);
            this.geometry = new mxGeometry(x, y, width, height);
        }
        this.host.refresh(this);
    }

    satisfy(context: EditorContext): void {
        this.registry.draftboardManager.add(this);
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