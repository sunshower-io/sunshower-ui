import {AbstractVertex} from "../graph/vertex";

import {
    Layer,
    mxCellOverlay,
    mxImage,
    mxConstants
} from  'mxgraph';

import {UUID} from 'utils/uuid';

import {Registry} from 'utils/registry';
import {Builder} from "../graph/builder";

export interface Layerable {

}

export class LayeredNode<T> extends AbstractVertex<T> implements Layerable {

    public host: Builder;

    constructor(parent: Layer,
                x: number,
                y: number,
                registry?: Registry,) {
        super(
            UUID.randomUUID(),
            null, parent,
            x, y, 208, 208,
            registry,
        );
    }


    addTo(builder: Builder): Layer {
        this.host = builder;
        return super.addTo(builder);
    }
}
