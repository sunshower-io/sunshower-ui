declare module 'mxgraph' {
    type Edge = mxEdge;


    export interface Layer {
        parent          :Layer;
        id              :string;
        value           :any;
        geometry        :mxGeometry;
        style           :string;
        shape           :mxShape;

        children        :Layer[];

        /**
         *
         * @param child
         * @param index
         */

        insert(child:Layer, index?:number) : void;

        /**
         *
         */
        isConnectable(): boolean

        /**
         *
         */
        getParent() : Layer;

        /**
         *
         * @param layer
         */
        setParent(layer:Layer);

        /**
         *
         * @param edge
         */
        setEdge(edge:boolean) : void;

        /**
         *
         * @param vertex
         */
        setVertex(vertex:boolean) : void;

        /**
         *
         * @param key
         */
        getProperty(key:string) : string;

        /**
         *
         * @param key
         * @param value
         */
        setProperty(key:string, value:string) : void;

        /**
         *
         * @param style
         */

        setStyle(style:string) : void;


        /**
         *
         * @param key
         */
        getAttribute(key:string) : string;

        /**
         *
         * @param key
         * @param value
         */
        setAttribute(key:string, value:string);

        /**
         *
         * @param connectable
         */
        setConnectable(connectable: boolean): void

        /**
         *
         * @param b
         */
        setVisible(b: boolean) : void;


        /**
         *
         */
        isVertex() : boolean;

        /**
         *
         */
        isEdge() : boolean;


        /**
         *
         */
        getChildCount() : number;

        /**
         *
         * @param index
         */
        getChildAt(index:number) : Layer;

        clone() : Layer;

    }

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


        add(rect:mxRectangle) : void;

    }

    export class mxGeometry {
        x:number;
        y:number;
        width:number;
        height:number;
        relative:boolean;

        points: mxPoint[];

        constructor(
            x           ?:number,
            y           ?:number,
            width       ?:number,
            height      ?:number
        );

        clone() : mxGeometry;

        offset: mxPoint;


        translate(x:number, y:number) : void;

        getTerminalPoint(c:boolean) : mxGeometry;



    }
    export module mxGeometry {

        function fromRectangle(geometry:mxGeometry) : mxRectangle;
    }
}