declare module 'mxgraph' {




    type ImportFunction = (
        graph:mxGraph,
        event:any,
        target:any,
        x:number,
        y:number
    ) => void;


    export module mxUtils {

        function getPrettyXml(x:any) : string;

        function bind(a: any, b:any) : void;

        function getXml(a:any) : any;

        /**
         *
         * @param el
         */
        function getTextContent(el:HTMLElement) : string;

        /**
         *
         * @param el
         * @param str
         */
        function setTextContent(
            el:HTMLElement,
            str:string
        ) : void;

        function indexOf(cells:Layer[], parent:Layer) : number;
        /**
         *
         * @param cells
         * @param acending
         */
        function sortCells(cells:Layer[], acending:boolean) : Layer[];

        /**
         *
         * @param t
         */

        function clone<T>(t: T): T;

        /**
         *
         * @param cell
         */

        function isNode(cell: Layer): boolean;

        /**
         *
         * @param msg
         * @param code
         * @param we
         */

        function error(msg: string, code: number, we: boolean): void;

        /**
         *
         */
        function createXmlDocument(): XmlDocument;

        /**
         *
         * @param namespace
         * @param name
         */

        function createElementNS(namespace: string, name: string): XmlDocument;


        /**
         *
         * @param element
         * @param graph
         * @param func
         * @param dragElement
         * @param dx
         * @param dy
         * @param autoscroll
         * @param scalePreview
         * @param highlightDropTargets
         * @param getDropTarget
         */
        function makeDraggable(element: HTMLElement,
                               graph: mxGraph,
                               func : ImportFunction,
                               dragElement?: HTMLElement,
                               dx ?: number,
                               dy ?: number,
                               autoscroll?: boolean,
                               scalePreview ?: boolean,
                               highlightDropTargets?: boolean,
                               getDropTarget?: () => void): mxDragSource;
    }




}