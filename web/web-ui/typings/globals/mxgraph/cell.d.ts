declare module 'mxgraph' {

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