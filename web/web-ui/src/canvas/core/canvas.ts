import {
    MenuItem,
    OperationContext
} from 'common/elements/menu';

import {
    mxImage,
    mxCell,
    mxUtils,
    mxGraph,
    mxRubberband,
    mxConstants,
    mxRectangle,
    mxShape,
    mxPoint,
    mxConnectionHandler,
    mxPolyline,
    mxVertexHandler,
    mxCellState,
    mxGeometry,
    Layer,
    mxMouseEvent,
    mxConnectionConstraint,
    mxGraphHandler
} from "mxgraph";

import {Grid} from "./grid/grid";
import {Rectangle} from 'geometry/shapes';

import {Element} from 'canvas/element/element';

import {CellRenderer} from "./cell-renderer";
import {MenuSelector} from "./menu-selection";
import {GraphHandler} from "./graph-handler";
import {ConnectionHandler} from './connection-handler';
import {CanvasModel} from "./canvas-model";
import {VertexHandler} from "./vertex-handler";
import {Registry} from "utils/registry";
import {ActionManager} from "canvas/actions/action-service";


export interface NavigationAware {
    toggleLeft(): boolean;
    toggleRight(): boolean;
}

export interface EditorContext {
    host            : NavigationAware;
    graph           : Canvas;
    offset          ?: {top: number, left: number};
    location        ?: {x: number, y: number};
    properties      ?: {[key: string]: any};
}


export class EditorOperations {
    static set(editorOperation: EditorContext,
                 key: string,
                 object: any): void {
        if (!editorOperation.properties) {
            editorOperation.properties = {};
        }
        editorOperation.properties[key] = object;
    }

    static get(editorOperation:EditorContext, key:string) : any {
        if(editorOperation.properties) {
            return editorOperation.properties[key];
        }
        return null;
    }
}
export interface EditorOperation extends OperationContext {
    apply(context: EditorContext): void;
}

export interface EditorEvent {
    operation: EditorOperation;
}


export interface Editor {
    menus: MenuItem[];
}

mxConstants.HANDLE_FILLCOLOR = '#239AE8';
mxConstants.HANDLE_STROKECOLOR = '#239AE8';
mxConstants.VERTEX_SELECTION_COLOR = '#0000FF';

mxRubberband.defaultOpacity = 1;

mxShape.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0.5, 0), true),
    new mxConnectionConstraint(new mxPoint(0, 0.5), true),
    new mxConnectionConstraint(new mxPoint(1, 0.5), true),
    new mxConnectionConstraint(new mxPoint(0.5, 1), true),
];

mxPolyline.prototype.constraints = null;


export class Canvas extends mxGraph {

    private grid: Grid;


    constructor(public readonly container           : HTMLElement,
                public readonly registry            : Registry,
                private readonly actionManager      : ActionManager
    ) {
        super(container, new CanvasModel());
        this.createMenuSelector();
        this.setPanning(true);
        this.setConnectable(true);
        this.foldingEnabled = true;
        this.setHtmlLabels(true);
        this.gridSize = 32;
        this.extendParents = true;
        this.constrainChildren = true;
        this.constrainRelativeChildren = true;
        this.extendParentsOnAdd = true;
        this.cellRenderer = new CellRenderer();
        this.autoScroll = true;
        this.grid = new Grid(this);
        this.cellsDeletable = true;
        this.grid.draw();
        this.allowLoops = false;
        this.autoExtend = true;
        this.allowDanglingEdges = false;
        this.resizeContainer = true;

        this.recursiveResize = false;

        this.createDefaultStyles();

    }


    extendParent(cell:Layer) {
        if(cell.getAttribute('no-extend-parent')) {

        } else {
            super.extendParent(cell);
        }
    }

    createMenuSelector(): void {
        new MenuSelector(this, this.actionManager);
    }

    createVertexHandler(state: mxCellState): mxVertexHandler {
        return new VertexHandler(state);
    }

    createGraphHandler(): mxGraphHandler {
        return new GraphHandler(this);
    }

    isCellSelectable(cell:Layer) : boolean {
        return true;
    }

    getChildVertices(parent: Layer): Layer[] {
        if (parent.getAttribute('element')) {
            let successors = (parent as Element).getSuccessors();
            return successors;
        } else {
            return super.getChildVertices(parent);
        }
    }

    getCellsForGroup(cells: Layer[]): Layer[] {
        return super.getCellsForGroup(cells);
    }

    getChildCells(cell: Layer, vertices?: boolean, edges?: boolean): Layer[] {
        if (cell.getAttribute('element')) {
            let successors = (cell as Element).getSuccessors();
            return successors;
        } else {
            return super.getChildCells(cell);
        }
    }



    getHostContainerBounds(): Rectangle {
        let je = $(this.container),
            offset = je.offset();

        return {
            x: offset.left,
            y: offset.top,
            width: je.width(),
            height: je.height(),
        };
    }


    public addNode(node: Node): void {


    }


    createConnectionHandler(): mxConnectionHandler {
        return new ConnectionHandler(this);
    }

    redraw(): void {
        this.grid.draw();
    }


    convertValueToString(cell: mxCell): string {
        let label = cell.getAttribute('label');
        if (label) {
            return label;
        }
        if(cell.getAttribute('named')) {
            if((cell as any).name) {
                return (cell as any).name;
            }
        }
        return super.convertValueToString(cell);
    }



    // cellsMoved(cells: mxCell[],
    //            dx: number,
    //            dy: number,
    //            disconnect: boolean,
    //            constrain: boolean,
    //            extend: boolean): void {
    //     // let toMove = [];
    //     // for(let cell of cells) {
    //     //     if(cell.getAttribute('synthetic')) {
    //     //         toMove.push(cell);
    //     //         let layer = (cell as any) as LayeredNode<any>;
    //     //         for(let member of layer.members) {
    //     //             toMove.push(member);
    //     //         }
    //     //     }
    //     // }
    //     super.cellsMoved(cells, dx, dy, disconnect, constrain, extend);
    // }

    moveCells(cells: Layer[],
              dx: number,
              dy: number,
              clone?: boolean,
              parent?: Layer,
              event?: mxMouseEvent): Layer[] {

        let toMove = [].concat(cells);

        for (let cell of cells) {
            if (cell.getAttribute('element')) {
                this.getDescendendants(cell as Element, toMove);
            }
        }
        return super.moveCells(toMove, dx, dy, clone, parent, event);
    }

    getDescendendants(cell: Element, elements: Element[]): void {
        let successors = cell.getSuccessors();
        if (successors) {
            for (let child of successors) {
                elements.push(child);
                this.getDescendendants(child, elements);
            }
        }
    }


    // selectCellForEvent(cell: mxCell) {
    //     if (cell.getAttribute('constituent') === '1') {
    //         let delegate = this.model.getParent(cell);
    //         while (delegate.getAttribute('constituent') === '1') {
    //             delegate = this.model.getParent(delegate);
    //         }
    //         super.selectCellForEvent(delegate);
    //     } else {
    //         super.selectCellForEvent(cell);
    //     }
    // }

    resizeChildCells(cell: Layer, geometry: mxGeometry) {
        let geo = this.model.getGeometry(cell),
            dx = geometry.width / geo.width,
            dy = geometry.height / geo.height,
            childCount = this.model.getChildCount(cell);

        for (let i = 0; i < childCount; i++) {
            let child = this.model.getChildAt(cell, i);
            if (child.getAttribute('rresize') !== '0') {
                this.scaleCell(
                    child,
                    dx,
                    dy,
                    true
                );
            }

            if (child.getAttribute('lfix')) {
                let cgeo = child.geometry;
                cgeo.x = geometry.width - 32;
                cgeo.y = cgeo.y;
                this.model.setGeometry(child, cgeo);
            }

        }
    }

    /**
     *
     * @param cell
     * @returns {any}
     */


    getPreferredSizeForCell(cell: mxCell): mxRectangle {
        if (cell.getAttribute('rresize') === '0' || cell.getAttribute('no-resize')) {
            console.log("FRAP");
            return cell.geometry as any as mxRectangle;
        } else {
            return super.getPreferredSizeForCell(cell);
        }
    }


    getAllConnectionConstraints(terminal: mxCell, source: mxCell): mxConnectionConstraint[] {
        if (terminal != null && terminal.shape != null) {
            if (terminal.shape.stencil != null) {
                if (terminal.shape.stencil != null) {
                    return terminal.shape.stencil.constraints;
                }
            }
            else if (terminal.shape.constraints != null) {
                return terminal.shape.constraints;
            }
        }
        return null;
    }


    protected createDefaultStyles(): void {
        this.expandedImage =
            new mxImage('assets/sui/themes/hasli/assets/images/expand.svg', 16, 16);
        this.collapsedImage = new mxImage(
            'assets/sui/themes/hasli/assets/images/compress.svg', 16, 16);
        this.getStylesheet()
            .getDefaultEdgeStyle()
            ['edgeStyle'] =
            'orthogonalEdgeStyle';
    }


    public computeBoundingBox(cells: Layer[], relative: boolean, includeEdges: boolean): mxRectangle {
        includeEdges = (includeEdges != null) ? includeEdges : false;
        let result: mxRectangle = null;
        if (cells) {
            for (let i = 0; i < cells.length; i++) {
                if (includeEdges || this.model.isVertex(cells[i])) {
                    let geo = this.model.getCellState(cells[i]).getCellBounds();
                    if (geo) {
                        let bbox = null;
                        if (this.model.isEdge(cells[i])) {
                            let pts = geo.points;
                            if (pts && pts.length > 0) {
                                let tmp = new mxRectangle(pts[0].x, pts[0].y, 0, 0);
                                let addPoint = function (pt) {
                                    if (pt != null) {
                                        tmp.add(new mxRectangle(pt.x, pt.y, 0, 0));
                                    }
                                };
                                for (let j = 1; j < pts.length; j++) {
                                    addPoint(pts[j]);
                                }
                                addPoint(geo.getTerminalPoint(true));
                                addPoint(geo.getTerminalPoint(false));
                                bbox = tmp;
                            }
                        }
                        else {
                            let parent = this.model.getParent(cells[i]);
                            if (geo.relative && relative) {
                                if (this.model.isVertex(parent) && parent != this.view.currentRoot) {
                                    let tmp = this.getBoundingBoxFromGeometry([parent], false);

                                    if (tmp != null) {
                                        bbox = new mxRectangle(geo.x * tmp.width, geo.y * tmp.height, geo.width, geo.height);

                                        if (mxUtils.indexOf(cells, parent) >= 0) {
                                            bbox.x += tmp.x;
                                            bbox.y += tmp.y;
                                        }
                                    }
                                }
                            }
                            else {
                                geo = geo.clone() as mxRectangle;
                                geo.relative = false;
                                geo.offset = parent.geometry.offset;
                                bbox = mxRectangle.fromRectangle(geo);
                                if (this.model.isVertex(parent) && mxUtils.indexOf(cells, parent) >= 0) {
                                    let tmp = this.getBoundingBoxFromGeometry([parent], false);
                                    if (tmp != null) {
                                        bbox.x += tmp.x;
                                        bbox.y += tmp.y;
                                    }
                                }
                            }

                            if (bbox != null && geo.offset != null) {
                                bbox.x += geo.offset.x;
                                bbox.y += geo.offset.y;
                            }
                        }

                        if (bbox != null) {
                            if (result == null) {
                                result = mxRectangle.fromRectangle(bbox);
                            }
                            else {
                                result.add(bbox);
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
}
