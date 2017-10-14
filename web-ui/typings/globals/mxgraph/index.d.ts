declare module 'mxgraph' {

    export class mxXmlCanvas2D {

        scale(scale: number): void;

        translate(x: number, y: number): void;


    }


    export interface Cloneable<T> {
        clone(): T;
    }
    export class mxClient {
        static isBrowserSupported(): boolean;

        static basePath: string;
        static imageBasePath: string;
    }

    export class XmlDocument {

        /**
         *
         * @param key
         * @param value
         */
        setAttribute(key: string, value: string): void;

        /**
         *
         * @param cell
         */
        appendChild(cell: XmlDocument);

        /**
         *
         * @param name
         */
        createElement(name: string): XmlDocument;

        /**
         *
         * @param namespace
         * @param name
         */

        createElementNS(namespace: string, name: string): XmlDocument;


        /**
         *
         * @param namespace
         * @param name
         * @param xlink
         */
        setAttributeNS(namespace: string, name: string, xlink?: string): void;

    }


    export interface Connectable {
        isConnectable(): boolean;
        setConnectable(connectable: boolean): void;
    }


    //not technically part of mxGraph's api, but w/e.
    export interface Component<T extends Layer> {
        graph: mxGraph;
        constituent: boolean;
        cast(): T;
    }


    export class mxVertex extends mxCell implements Layer {


    }

    type Bounds = mxGraphBounds;


    export class mxGraphModel {

        root: Layer;




        constructor(root?: Layer);

        addListener(k:string, v:any) : void;

        remove(cell:Layer) : Layer;

        clear() : void;


        /**
         *
         * @param layer
         */
        isEdge(layer: Layer): boolean;

        /**
         *
         * @param layer
         */
        isVertex(layer: Layer): boolean;

        /**
         *
         * @param cell
         * @param geometry
         */
        setGeometry(cell: Layer, geometry: mxGeometry);

        /**
         *
         * @param parent
         * @param vertices
         * @param edges
         */

        getChildCells(parent: Layer,
                      vertices: boolean,
                      edges: boolean): Layer[];


        getCellState(cell: Layer): mxCellState;

        /**
         *
         * @param parent
         * @param index
         */
        getChildAt(parent: Layer, index: number): Layer;

        /**
         *
         * @param cell
         */
        getGeometry(cell: Layer): mxGeometry;

        /**
         *
         */
        endUpdate(): void;

        /**
         *
         */
        beginUpdate(): void;

        getChildCount(cell: Layer): number;

        /**
         *
         * @param id
         */
        getCell(id: string): Layer;

        /**
         *
         * @param cell
         */
        getParent(cell: Layer): Layer;

        /**
         *
         * @param cell
         */
        isVertex(cell: Layer): boolean;
    }


    export module mxEvent {
        function disableContextMenu(container: HTMLElement);
    }


    export class mxRubberband {
        constructor(g: mxGraph);

        static enabled: boolean;
        static defaultOpacity: number;

        currentX: number;
        currentY: number;


        mouseDown(a: any, b: any): any;

        /**
         * @param a
         * @param b
         */

        mouseUp(a: any, b: any): any;

        /**
         *
         * @param x
         * @param y
         */

        update(x: number, y: number): void;

        /**
         *
         * @param a
         * @param b
         */

        mouseMove(a: any, b: any): any;

        /**
         * @param x
         * @param y
         */
        start(x: number, y: number): void;
    }

}
