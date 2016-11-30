

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



    export class mxCell implements Layer, Connectable {
        value: any;
        isConnectable(): boolean

        getParent() : mxCell;


        setConnectable(connectable: boolean): void
        getAttribute(key:string) : string;

        setAttribute(key:string, value:string);

    }

    export class mxEdge extends mxCell {

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


    export class mxGraphModel {
        endUpdate() : void;
        beginUpdate(): void;

        getParent(cell:Layer) : Layer;
    }

    type Edge = mxEdge;

    type Layer = mxCell;

    type Model = mxGraphModel;

    type Vertex = mxVertex;

    export class mxPoint {
        x: number;
        y: number;

    }

    export class mxGraphBounds implements Cloneable<mxGraphBounds> {
        x       :number;
        y       :number;
        width   :number;
        height  :number;
        clone(): mxGraphBounds
    }

    export class mxGraphView {
        scale: number;
        translate:mxGraphBounds;
        isContainerEvent(event:Event) : boolean;
    }

    type Bounds = mxGraphBounds;

    class mxGraph implements Connectable {


        mouseListeners      : {[name:string]: any};
        gridSize            : number;
        container           : Element;
        view                : mxGraphView;

        constructor(
            container?:HTMLElement,
            model?:mxGraphModel
        );

        isConnectable(): boolean


        removeCells(cells:mxCell[]);


        addListener(key:string, listener:(sender:any, event:any) => void) : boolean;

        hasListener(key:string, listener:(sender:any, event:any) => void) : boolean;


        getModel() : Model;

        getDefaultParent() : Layer;

        getGraphBounds() : Bounds;

        setPanning(panning:boolean);

        selectCellForEvent(cell:mxCell);

        setConnectable(connectable:boolean);

        convertValueToString(cell:mxCell) : string;




        insertVertex(
            parent:Layer,
            id:string,
            value: any,
            x:number,
            y:number,
            width:number,
            height:number,
            style?:string
        ) : Vertex;


        insertEdge(
            parent:Layer,
            id:string,
            value:any,
            source: Vertex,
            target: Vertex
        ) : Edge ;
    }

    export module mxEvent  {
        function disableContextMenu(container:HTMLElement);
    }


    export class mxRubberband {
        constructor(g:mxGraph);
        static enabled:        boolean;
        static defaultOpacity: number;
    }



    type mxCellStyle = {[key:string]:string};

    export class mxStylesheet {
        constructor();
        styles: {[key:string]:mxCellStyle};

        createDefaultEdgeStyle() : mxCellStyle;

        createDefaultVertexStyle() : mxCellStyle;


        putDefaultVertexStyle(style:mxCellStyle) : void;

        putDefaultEdgeStyle(style:mxCellStyle) : void;

        getDefaultEdgeStyle() : mxCellStyle;

        getDefaultVertexStyle() : mxCellStyle;


        putCellStyle(name:string, style:mxCellStyle) : void;

        getCellStyle(name:string, defaultStyle?:mxCellStyle) :  mxCellStyle;

    }


}
