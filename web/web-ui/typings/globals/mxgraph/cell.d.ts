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

        isConnectable(): boolean

        getParent() : mxCell;


        setEdge(edge:boolean) : void;
        setStyle(style:mxStylesheet) : void;


        setConnectable(connectable: boolean): void
        getAttribute(key:string) : string;

        setAttribute(key:string, value:string);


    }

    export class mxEdge extends mxCell {

    }

}