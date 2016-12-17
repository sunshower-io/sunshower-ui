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

    export class mxCell implements Layer, Connectable {
        parent          :mxCell;
        id              :string;
        value           :any;
        geometry        :mxGeometry;
        style           :string;
        shape           :mxShape;

        children        :mxCell[];

        constructor(label?:string, geometry?:mxGeometry);

        /**
         *
         */
        isConnectable(): boolean

        /**
         *
         */
        getParent() : mxCell;

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

        getProperty(key:string) : string;

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
    }

    export class mxEdge extends mxCell {

    }

}