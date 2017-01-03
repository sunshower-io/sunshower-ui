import {
    Layer,
    mxGraphModel
} from 'mxgraph';


export class CanvasModel extends mxGraphModel {

    constructor(root?:Layer) {
        super(root);
    }

    getChildCells(parent:Layer, vertices:boolean, edges:boolean) : Layer[] {
        console.log("child cells");


        return super.getChildCells(parent, vertices, edges);
    }

}