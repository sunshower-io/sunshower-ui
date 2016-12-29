declare module 'mxgraph' {
    type Edge = mxEdge;

    type Layer = mxCell;


    type Model = mxGraphModel;

    type Vertex = mxVertex;

    export interface mxConstraint {

    }

    export class mxConnectionConstraint {
        constructor(pt:mxPoint, a:boolean);
    }

    export class mxPolyline extends mxShape {}

    export class mxShape {
        stencil         : mxShape;
        constraints     : mxConstraint[];
        /**
         *
         */
        redraw(): void;

        /**
         *
         * @param state
         */
        apply(state: mxCellState): void;

    }

    export class mxPoint {
        x:number;
        y:number;
        constructor(x:number, y:number);
    }

    export class mxRectangle extends mxGeometry {


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

        clone() : mxGeometry;

        translate(x:number, y:number) : void;

    }
}