import {
    Layer,
    mxGraphModel
} from 'mxgraph';


export class CanvasModel extends mxGraphModel {

    constructor(root?:Layer) {
        super(root);
    }

    getChildCells(parent:Layer, vertices:boolean, edges:boolean) : Layer[] {
        return super.getChildCells(parent, vertices, edges);
    }

}