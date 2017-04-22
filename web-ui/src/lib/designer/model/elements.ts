import {
    Layer,
    mxCell,
    mxEdge
} from 'mxgraph';


export interface Drawable extends Layer {


}


export class Element extends mxCell implements Drawable {

    constructor() {
        super();
    }
}

export class Edge extends mxEdge implements Drawable {

    constructor() {
        super();
    }


}

