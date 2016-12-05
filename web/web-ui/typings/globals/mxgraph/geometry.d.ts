declare module 'mxgraph' {
    type Edge = mxEdge;

    type Layer = mxCell;


    type Model = mxGraphModel;

    type Vertex = mxVertex;

    export class mxPoint {
        x: number;
        y: number;
    }

    export class mxRectangle {

    }

    export class mxGeometry {
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