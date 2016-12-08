declare module 'mxgraph' {
    type Edge = mxEdge;

    type Layer = mxCell;


    type Model = mxGraphModel;

    type Vertex = mxVertex;

    export interface mxPoint {
        x: number;
        y: number;
    }

    export class mxRectangle {

    }

    export class mxGeometry {
        x:number;
        y:number;
        width:number;
        height:number;
        relative:boolean;

        constructor(
            x:number,
            y:number,
            width:number,
            height:number
        );

    }
}