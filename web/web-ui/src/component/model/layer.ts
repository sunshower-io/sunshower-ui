/**
 *
import {AbstractVertex} from "component/model/vertex";

import {
    mxCell as mxLayer,
    mxCellOverlay,
    mxImage,
    mxConstants
} from  'mxgraph';

import {UUID} from 'utils/uuid';

import {Layer as ElementLayer} from 'elements/layer';

import {Registry} from 'utils/registry';
import {Canvas} from "canvas/core/canvas";

export interface Layerable {

    members: mxLayer[];

    addMember(member: mxLayer): void;
}


export class LayeredNode<T> extends AbstractVertex<T> implements Layerable {

    public host: Canvas;

    public members: mxLayer[];


    constructor(parent: mxLayer,
                data: T,
                x: number,
                y: number,
                registry?: Registry,) {
        super(
            UUID.randomUUID(),
            data,
            parent,
            x, y, 168, 192,
            registry,
        );
        this.setCollapsable(true);
        super.set('synthetic', '1', true);
    }

    addMember(layer: mxLayer): void {
        // if(!this.children) {
        //     this.children = [];
        // }
        // this.children.push(layer);
        if (!this.members) {
            this.members = [];
        }
        this.members.push(layer);
    }


    addTo(builder: Canvas): mxLayer {
        this.host = builder;
        return super.addTo(builder);
    }
}


export class Layer extends LayeredNode<ElementLayer> {
    name: string;
    description: string;


    protected createLayerOverlay(): mxCellOverlay {

        let
            url = `assets/sui/themes/hasli/assets/images/layers.svg`,
            image = new mxImage(url, 24, 24),
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
        return [this.createLayerOverlay()];
    }
}
 */
