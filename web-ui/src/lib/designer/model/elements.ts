import {
    Layer,
    mxCell,
    mxCellOverlay
} from 'mxgraph';



export class Overlay extends mxCellOverlay {

}

export interface Drawable extends Layer {
    overlays() : Overlay[];
}


export abstract class RenderableElement extends mxCell implements Drawable {

    constructor() {
        super();
    }


    overlays() : Overlay[] {
        return [];
    }







}


