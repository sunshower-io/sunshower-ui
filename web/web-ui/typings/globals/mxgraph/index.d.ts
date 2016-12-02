

declare module 'mxgraph' {



    export interface Cloneable<T> {
        clone()  : T;
    }
    export class mxClient {
        static isBrowserSupported() : boolean;
        static basePath         :string;
        static imageBasePath    :string;
    }

    export class XmlDocument {


        createElement(name:string) : mxCell;
    }

    export module mxUtils {
        function isNode(cell:Layer) : boolean;
        function error(msg:string, code:number, we: boolean) : void;

        function createXmlDocument() : XmlDocument;
    }




    export interface Connectable {
        isConnectable() : boolean;
        setConnectable(connectable:boolean) : void;
    }



    export class mxGraphHandler {
        graph:mxGraph;
        getInitialCellForEvent(self:mxGraphHandler);
    }

    //not technically part of mxGraph's api, but w/e.
    export interface Component<T extends mxCell> {
        graph:mxGraph;
        constituent:boolean;
        cast() : T;
    }


    export class mxVertex extends mxCell {

    }

    type Bounds = mxGraphBounds;

    export class mxGraphModel {
        endUpdate() : void;
        beginUpdate(): void;

        getParent(cell:Layer) : Layer;
    }




    export module mxEvent  {
        function disableContextMenu(container:HTMLElement);
    }


    export class mxRubberband {
        constructor(g:mxGraph);
        static enabled:        boolean;
        static defaultOpacity: number;
    }

}
