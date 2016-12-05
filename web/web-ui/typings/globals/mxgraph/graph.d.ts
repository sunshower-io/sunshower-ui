declare module 'mxgraph' {

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

    export class mxMouseEvent {
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


        foldingEnabled: boolean;
        isMouseDown: boolean;
        connectionHandler: mxConnectionHandler;

        /**
         *
         * @param container
         * @param model
         */

        constructor(container?: HTMLElement,
                    model?: mxGraphModel);


        /**
         *
         */

        createConnectionHandler(): mxConnectionHandler;

        /**
         *
         */

        isConnectable(): boolean

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



    }
}