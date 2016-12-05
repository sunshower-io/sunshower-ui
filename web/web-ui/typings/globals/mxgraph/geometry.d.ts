declare module 'mxgraph' {
    type Edge = mxEdge;

    type Layer = mxCell;


    type Model = mxGraphModel;

    type Vertex = mxVertex;

    export class mxPoint {
        x: number;
        y: number;
    }

    export class mxGeometry {
        relative:boolean;

        constructor(
            x:number,
            y:number,
            width:number,
            height:number
        );

    }
}