

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
import {Class, Copyable} from "lang/class";
import {BlockElement} from "./block";

import {
    EditableElement,
    BlockMember,
    Element
} from "canvas/element/element";
import {Layer} from "mxgraph";

export class VirtualCloud extends
    RegistryAwareElement
    implements
        Constrained ,
        Copyable<VirtualCloud>,
        BlockMember<VirtualCloud>,
        EditableElement<VirtualCloud, VirtualCloudEditor>
{

    editor: Class<VirtualCloudEditor> = VirtualCloudEditor;

    constructor(registry:Registry) {
        super(registry);
        this.setAncestor(true);
        this.setCollapsable(true);
        this.name = 'VPC 0';
        this.icon = 'assets/sui/themes/hasli/assets/images/icons/provider/generic/cloud.svg';
        this.geometry = new mxGeometry(0, 0, 100, 100);
    }

    copyInto(canvas:Canvas, parent:Layer, x:number, y:number) : VirtualCloud {
        let clone = new VirtualCloud(this.registry);
        clone.geometry = this.geometry.clone();
        clone.host = this.host;
        clone.parent = parent;
        clone.geometry.x = 48;
        clone.geometry.y = 48;
        for(let child of this.getChildren()) {
            if((child as any).copyInto) {
                let cchild = (child as any as BlockElement).copyInto(canvas, clone, x, y);
                cchild.addPredecessor(clone);
                clone.addSuccessor(cchild);
            }
        }
        clone.addTo(canvas);
        return clone;
    }

    copy(): VirtualCloud {
        let clone = new VirtualCloud(this.registry);
        clone.geometry = this.geometry.clone();
        clone.host = this.host;
        for(let child of this.getChildren()) {
            if((child as any).copy) {
                let clonable = child as any as Copyable<any>;
                let ccopy = clonable.copy();
                ccopy.addPredecessor(clone);
                clone.addSuccessor(ccopy);
            }
        }
        return clone;
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