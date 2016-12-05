

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

        function clone<T>(t:T):T;

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
        guidesEnabled: boolean;
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

        /**
         *
         * @param parent
         * @param index
         */
        getChildAt(parent:Layer, index:number) : Layer;
        /**
         *
         * @param cell
         */
        getGeometry(cell:Layer) : mxGeometry;
        /**
         *
         */
        endUpdate() : void;

        /**
         *
         */
        beginUpdate(): void;

        getChildCount(cell:Layer) : number;

        /**
         *
         * @param id
         */
        getCell(id:string) : Layer;

        /**
         *
         * @param cell
         */
        getParent(cell:Layer) : Layer;

        /**
         *
         * @param cell
         */
        isVertex(cell:mxCell) : boolean;
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
