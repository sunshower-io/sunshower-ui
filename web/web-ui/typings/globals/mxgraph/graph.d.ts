declare module 'mxgraph' {

    export class mxConnectionHandler {
        constructor(
            graph:mxGraph,
            connection?:(
                source:mxCell,
                target:mxCell,
                style:mxStylesheet
            ) => void);


        createEdge(source:mxCell, target:mxCell, style:mxStylesheet);
        connect(source:mxCell, target:mxCell, event:mxEvent, dropTarget:mxCell);
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

    class mxGraph implements Connectable {


        mouseListeners      : {[name:string]: any};
        gridSize            : number;
        container           : Element;
        view                : mxGraphView;
        connectionHandler   : mxConnectionHandler;

        constructor(
            container?:HTMLElement,
            model?:mxGraphModel
        );

        createConnectionHandler() : mxConnectionHandler;

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
}