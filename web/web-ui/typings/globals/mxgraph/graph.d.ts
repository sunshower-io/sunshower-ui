declare module 'mxgraph' {

    export class mxVertexHandler {

        /**
         *
         * @param cell
         * @param dx
         * @param dy
         * @param index
         * @param gridEnabled
         * @param constrained
         * @param recurse
         */
        resizeCell(cell:Layer ,
                   dx: number,
                   dy: number,
                   index: number,
                   gridEnabled: boolean,
                   constrained: boolean,
                   recurse: boolean
        )


    }

    export class mxConnectionHandler {
        constructor(graph: mxGraph,
                    connection?: (source: mxCell,
                                  target: mxCell,
                                  style: mxStylesheet) => void);


        createEdge(source: mxCell, target: mxCell, style: mxStylesheet);

        connect(source: mxCell, target: mxCell, event: mxEvent, dropTarget: mxCell);
    }

    export class mxGraphSelectionModel {
    }

    export class mxGraphBounds implements Cloneable<mxGraphBounds> {
        x: number;
        y: number;
        width: number;
        height: number;

        clone(): mxGraphBounds
    }

    export class mxGraphView {
        scale: number;
        translate: mxGraphBounds;

        getState(cell: Layer): mxCellState;

        isContainerEvent(event: Event): boolean;
    }


    export interface MouseListener {

        mouseMove(sender: mxGraph, event: mxMouseEvent): void;
    }

    type key = string | number;

    type Style = {[key: string]: any};

    export class mxCellState {
        cell: mxCell;
        style: Style;

        shape: mxShape;
        text: mxShape;
    }

    export class mxShape {
        /**
         *
         */
        redraw(): void;

        /**
         *
         * @param state
         */
        apply(state: mxCellState): void;

    }

    export class mxMouseEvent extends mxEvent {
        getEvent(): mxEvent;

        /**
         *
         */
        getCell(): mxCell;

        /**
         *
         */
        getState(): mxCellState;
    }

    class mxGraph implements Connectable {


        mouseListeners: {[name: string]: any};
        gridSize: number;
        container: Element;
        view: mxGraphView;
        model: mxGraphModel;
        recursiveResize:boolean;



        foldingEnabled: boolean;
        isMouseDown: boolean;
        connectionHandler: mxConnectionHandler;

        refresh(cell?:Layer) : void;

        /**
         *
         * @param labels
         */
        setHtmlLabels(labels:boolean) : void;

        /**
         *
         * @param container
         * @param model
         */

        constructor(container?: HTMLElement,
                    model?: mxGraphModel);

        /**
         *
         * @param cell
         * @param overlay
         */
        removeCellOverlay(
            cell:Layer,
            overlay:mxCellOverlay
        ) : mxCellOverlay;


        isRecursiveResize(state:mxCellState) : boolean;

        /**
         *
         * @param cell
         * @param dx
         * @param dy
         * @param recurse
         */
        scaleCell(
            cell:Layer,
            dx:number,
            dy:number,
            recurse:boolean
        );

        /**
         *
         * @param cell
         * @param bounds
         * @param recurse
         */
        resizeCell(
            cell:mxCell,
            bounds:mxRectangle,
            recurse:boolean
        ) : Layer;

        getCellAt(
            x:number,
            y:number,
            parent?:Layer,
            vertices?:boolean,
            edges?: boolean
        );

        ungroupCells(layers:Layer[]) : Layer[];

        /**
         *
         */

        createConnectionHandler(): mxConnectionHandler;

        /**
         *
         */

        isConnectable(): boolean

        /**
         *
         * @param cell
         * @param parent
         * @param index
         * @param source
         * @param target
         */

        addCell(
            cell:Layer,
            parent:Layer,
            index?:number,
            source?:Layer,
            target?:Layer
        ) : Layer ;

        /**
         *
         */

        getSelectionCells(): Layer[];

        /**
         *
         * @param cell
         */

        setSelectionCell(cell: Layer);


        /**
         *
         * @param cells
         */

        removeCells(cells: mxCell[]);


        /**
         *
         * @param cell
         */
        getPreferredSizeForCell(cell:Layer) : mxRectangle;


        getModel(): Model;


        groupCells(group: Layer,
                   border: number,
                   cells: Layer[]);

        /**
         *
         */

        getDefaultParent(): Layer;

        /**
         *
         */
        getGraphBounds(): Bounds;

        /**
         *
         * @param panning
         */
        setPanning(panning: boolean);

        /**
         *
         * @param cell
         */
        selectCellForEvent(cell: mxCell);

        /**
         *
         * @param connectable
         */

        setConnectable(connectable: boolean);

        /**
         *
         * @param cell
         */

        convertValueToString(cell: mxCell): string;

        /**
         *
         * @param listener
         */
        addMouseListener(listener: MouseListener): void;


        /**
         *
         * @param vertex
         * @param overlay
         */
        addCellOverlay(vertex: mxCell,
                       overlay: mxCellOverlay): void;

        /**
         *
         * @param key
         * @param listener
         */

        addListener(key: string,
                    listener: (sender: any, event: any) => void): boolean;

        /**
         *
         * @param key
         * @param listener
         */

        hasListener(key: string,
                    listener: (sender: any, event: any) => void): boolean;


        /**
         *
         * @param parent
         * @param id
         * @param value
         * @param x
         * @param y
         * @param width
         * @param height
         * @param style
         */

        insertVertex(parent: Layer,
                     id: string,
                     value: any,
                     x: number,
                     y: number,
                     width: number,
                     height: number,
                     style?: string): Vertex;

        /**
         *
         * @param parent
         * @param id
         * @param value
         * @param source
         * @param target
         */

        insertEdge(parent: Layer,
                   id: string,
                   value: any,
                   source: Vertex,
                   target: Vertex): Edge ;

        createConnectionHandler() : mxConnectionHandler;

        moveCells(
            child:Layer,
            dx:number,
            dy:number,
            clone?:boolean,
            parent?:Layer,
            event?:mxMouseEvent,
            mapping?:any
        );



    }
}