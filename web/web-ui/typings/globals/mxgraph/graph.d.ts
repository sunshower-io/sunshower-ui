declare module 'mxgraph' {


    export class mxConnectionHandler {
        constructor(graph: mxGraph,
                    connection?: (source: Layer,
                                  target: Layer,
                                  style: mxStylesheet) => void);


        createEdge(source: Layer,
                   target: Layer,
                   style: mxStylesheet);

        connect(source: Layer,
                target: Layer,
                event: mxEvent,
                dropTarget: Layer);
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
        currentRoot: Layer;
        translate: mxGraphBounds;


        getCanvas(): Element;

        getGraphBounds(): mxRectangle;

        getDrawPane(): Element;

        getBackgroundPane(): Element;

        getState(cell: Layer): mxCellState;

        getCellStates(cells: Layer[]): mxCellState[];

        isContainerEvent(event: Event): boolean;
    }


    export interface MouseListener {

        mouseMove(sender: mxGraph, event: mxMouseEvent): void;
    }

    type key = string | number;

    type Style = {[key: string]: any};

    export class mxControl {
        scale           : number;
        bounds          : mxRectangle

    }

    export class mxCellState {
        x               : number;
        y               : number;
        width           : number;
        height          : number;


        view            : any;

        cell            : Layer;
        style           : Style;

        shape           : mxShape;
        text            : mxShape;
        control         : mxControl;


    }


    export class mxMouseEvent extends mxEvent {
        getEvent(): mxEvent;

        /**
         *
         */
        getCell(): Layer;

        /**
         *
         */
        getState(): mxCellState;
    }

    export class mxPanningHandler {

    }

    export class mxCellRenderer {
        getControlBounds(state: mxCellState,
                         w: number,
                         h: number): mxRectangle;

        redrawControl(state: mxCellState, forced: boolean): void;
    }

    export class mxGraph implements Connectable {


        mouseListeners          : {[name: string]: any};
        gridSize                : number;
        recursiveResize         : boolean;

        expandedImage           : mxImage;
        collapsedImage          : mxImage;


        foldingEnabled          : boolean;
        isMouseDown             : boolean;

        extendParents           : boolean;
        extendParentsOnAdd      : boolean;


        container               : Element;
        view                    : mxGraphView;
        model                   : mxGraphModel;
        graphHandler            : mxGraphHandler;
        cellRenderer            : mxCellRenderer;
        connectionHandler       : mxConnectionHandler;

        zoomIn(): void;

        zoomOut(): void;

        getView(): mxGraphView;

        /**
         *
         * @param cell
         */

        getCellGeometry(cell: mxCell): mxGeometry;


        setPanningHandler(handler: mxPanningHandler): void;

        /**
         *
         * @param cell
         */

        refresh(cell?: Layer): void;

        /**
         *
         * @param labels
         */
        setHtmlLabels(labels: boolean): void;

        /**
         *
         * @param child
         */

        updateCellSize(child: Layer): void;

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
        removeCellOverlay(cell: Layer,
                          overlay: mxCellOverlay): mxCellOverlay;


        isRecursiveResize(state: mxCellState): boolean;

        /**
         *
         * @param cell
         * @param dx
         * @param dy
         * @param recurse
         */
        scaleCell(cell: Layer,
                  dx: number,
                  dy: number,
                  recurse: boolean);

        getStylesheet(): mxStylesheet;

        /**
         *
         * @param cell
         * @param bounds
         * @param recurse
         */
        resizeCell(cell: Layer,
                   bounds: mxRectangle,
                   recurse: boolean): Layer;

        getCellAt(x: number,
                  y: number,
                  parent?: Layer,
                  vertices?: boolean,
                  edges?: boolean);

        ungroupCells(layers: Layer[]): Layer[];

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

        addCell(cell: Layer,
                parent: Layer,
                index?: number,
                source?: Layer,
                target?: Layer): Layer ;

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
         * @param dx
         * @param dy
         * @param disconnect
         * @param constrain
         * @param extend
         */

        cellsMoved(cells: Layer[],
                   dx: number,
                   dy: number,
                   disconnect: boolean,
                   constrain: boolean,
                   extend: boolean): void;

        /**
         *
         * @param cells
         */

        removeCells(cells: Layer[]);


        /**
         *
         * @param cell
         */
        getPreferredSizeForCell(cell: Layer): mxRectangle;


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
        selectCellForEvent(cell: Layer);

        /**
         *
         * @param connectable
         */

        setConnectable(connectable: boolean);

        /**
         *
         * @param cell
         */

        convertValueToString(cell: Layer): string;

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
        addCellOverlay(vertex: Layer,
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

        createConnectionHandler(): mxConnectionHandler;

        /**
         *
         * @param child
         * @param dx
         * @param dy
         * @param clone
         * @param parent
         * @param event
         * @param mapping
         */

        moveCells(cells: Layer[],
                  dx: number,
                  dy: number,
                  clone?: boolean,
                  parent?: Layer,
                  event?: mxMouseEvent,
                  mapping?: any): Layer[];


        /**
         *
         */
        createHandler(): mxGraphHandler;


    }
}