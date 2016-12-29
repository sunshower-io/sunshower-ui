

declare module 'mxgraph' {

    export class mxXmlCanvas2D{

        scale(scale:number) : void;
        translate(x:number, y:number) : void;


    }


    export interface Cloneable<T> {
        clone()  : T;
    }
    export class mxClient {
        static isBrowserSupported() : boolean;
        static basePath         :string;
        static imageBasePath    :string;
    }

    export class XmlDocument {

        /**
         *
         * @param key
         * @param value
         */
        setAttribute(key:string, value:string) : void;

        /**
         *
         * @param cell
         */
        appendChild(cell:XmlDocument);

        /**
         *
         * @param name
         */
        createElement(name:string) : XmlDocument;

        /**
         *
         * @param namespace
         * @param name
         */

        createElementNS(namespace:string, name:string) : XmlDocument;


        /**
         *
         * @param namespace
         * @param name
         * @param xlink
         */
        setAttributeNS(namespace:string, name:string, xlink?:string) : void;

    }

    export module mxUtils {


        function clone<T>(t:T):T;

        function isNode(cell:Layer) : boolean;

        function error(msg:string, code:number, we: boolean) : void;

        function createXmlDocument() : XmlDocument;

        function createElementNS(namespace:string, name:string) : XmlDocument;
    }




    export interface Connectable {
        isConnectable() : boolean;
        setConnectable(connectable:boolean) : void;
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

        root:               mxCell;
        /**
         *
         * @param cell
         * @param geometry
         */
        setGeometry(cell:Layer, geometry:mxGeometry);

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
        static enabled          : boolean;
        static defaultOpacity   : number;

        currentX                : number;
        currentY                : number;


        mouseDown(a:any, b:any) : any;

        /**
         * @param a
         * @param b
         */

        mouseUp(a:any, b:any) : any;

        /**
         *
         * @param x
         * @param y
         */

        update(x:number, y: number) : void;

        /**
         *
         * @param a
         * @param b
         */

        mouseMove(a:any, b:any) : any;

        /**
         * @param x
         * @param y
         */
        start(x: number, y:number) : void;
    }

}
