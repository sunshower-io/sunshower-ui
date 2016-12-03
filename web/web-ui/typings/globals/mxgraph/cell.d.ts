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

        constructor(
            image?:mxImage,
            tooltip?:string,
            align?:  string,
            valign?: string,
            offset?: number,
            cursor?: string
        );


        addListener(event:string, listener:(sender:any, event:mxEvent) => void);
    }

    export class mxCell implements Layer, Connectable {
        value: any;
        id:string;
        geometry: mxGeometry;

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
         * @param style
         */

        setStyle(style:mxStylesheet) : void;


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

    }

    export class mxEdge extends mxCell {

    }

}