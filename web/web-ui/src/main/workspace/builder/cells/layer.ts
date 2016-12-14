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
                data:T,
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
    }


    addTo(builder: Builder): Layer {
        this.host = builder;
        return super.addTo(builder);
    }
}
