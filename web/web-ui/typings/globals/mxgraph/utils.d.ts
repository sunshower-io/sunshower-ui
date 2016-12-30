declare module 'mxgraph' {

    type ImportFunction = (
        graph:mxGraph,
        event:any,
        target:any,
        x:number,
        y:number
    ) => void;


    export module mxUtils {


        function clone<T>(t: T): T;

        function isNode(cell: Layer): boolean;

        function error(msg: string, code: number, we: boolean): void;

        function createXmlDocument(): XmlDocument;

        function createElementNS(namespace: string, name: string): XmlDocument;


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