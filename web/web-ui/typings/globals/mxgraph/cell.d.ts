declare module 'mxgraph' {

    export class mxImage {
        public src          :string;
        public width        :number;
        public height       :number;
        constructor(
            src?:string,
            width?:number,
            height?:number
        );
    }




    export class mxCellOverlay {

        cursor:string;
        constructor(
            image?:mxImage,
            tooltip?:string,
            align?:  string,
            valign?: string,
            offset?: mxPoint,
            cursor?: string
        );


        addListener(event:string, listener:(sender:any, event:mxEvent) => void);
    }

    export interface Renderable {

    }

    export interface Node extends Renderable {

    }

    export interface SceneGraphElement extends Node {

    }

    export class mxCell implements Connectable, SceneGraphElement, Layer {
        parent          :Layer;
        id              :string;
        value           :any;
        geometry        :mxGeometry;
        style           :string;
        shape           :mxShape;

        children        :Layer[];


        constructor(label?:string, geometry?:mxGeometry);

        setGeometry(geo: mxGeometry);
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

    export class mxEdge extends mxCell {

    }

}