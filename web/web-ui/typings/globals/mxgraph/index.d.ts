declare module 'mxgraph' {

    export class mxConstants {
        static HANDLE_FILLCOLOR         :string;
        static HANDLE_STROKECOLOR       :string;
        static VERTEX_SELECTION_COLOR   :string;
    }


    export interface Cloneable<T> {
        clone()  : T;
    }
    export class mxClient {
        static isBrowserSupported() : boolean;
    }

    export module mxUtils {
        function error(msg:string, code:number, we: boolean) : void;
    }

    export class mxCell {

    }

    export class mxEdge {

    }


    export class mxVertex {

    }


    export class mxGraphModel {
        endUpdate() : void;
        beginUpdate(): void;
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


    export class mxEvent {
        static getSource(e:Event) : HTMLElement;
    }

    export class mxGraphView {
        scale: number;
        translate:mxGraphBounds;
        isContainerEvent(event:Event) : boolean;
    }

    type Bounds = mxGraphBounds;

    export class mxGraph {

        gridSize            : number;
        container           : Element;
        view                : mxGraphView;

        constructor(
            container?:HTMLElement,
            model?:mxGraphModel
        );


        getModel() : Model;

        getDefaultParent() : Layer;

        getGraphBounds() : Bounds;


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
}
