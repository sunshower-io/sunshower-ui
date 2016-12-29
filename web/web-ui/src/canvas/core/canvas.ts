
import {
    MenuItem,
    OperationContext
} from 'common/elements/menu';

import {
    mxImage,
    mxCell,
    mxUtils,
    mxGraph,
    mxGraphModel,
    mxRubberband,
    mxConstants,
    mxRectangle,
    mxShape,
    mxCellState,
    mxMouseEvent,
    mxPoint,
    mxConnectionHandler,
    mxPolyline,
    mxGeometry,
    Layer,
    mxConnectionConstraint,
    mxVertexHandler,
    mxGraphHandler
} from "mxgraph";

import {Grid} from "./grid/grid";
import {Rectangle} from 'geometry/shapes';

import {DialogService} from 'aurelia-dialog';
import {CellRenderer} from "./cell-renderer";
import {MenuSelector} from "./menu-selection";
import {GraphHandler} from "./graph-handler";
import {VertexHandler} from "./vertex-handler";
import {ConnectionHandler} from './connection-handler';
import CreateLayerMenuItem from "canvas/menu/selection-menu/create-layer";


export interface NavigationAware {
    toggleLeft(): boolean;
    toggleRight(): boolean;
}

export interface EditorContext {
    host        : NavigationAware;
    graph       : Canvas;
    offset      ?: {top: number, left: number};
    location    ?: {x: number, y: number};
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
    // new mxConnectionConstraint(new mxPoint(0.25, 0), true),
    new mxConnectionConstraint(new mxPoint(0.5, 0), true),
    // new mxConnectionConstraint(new mxPoint(0.75, 0), true),
    // new mxConnectionConstraint(new mxPoint(0, 0.25), true),
    new mxConnectionConstraint(new mxPoint(0, 0.5), true),
    // new mxConnectionConstraint(new mxPoint(0, 0.75), true),
    // new mxConnectionConstraint(new mxPoint(1, 0.25), true),
    new mxConnectionConstraint(new mxPoint(1, 0.5), true),
    // new mxConnectionConstraint(new mxPoint(1, 0.75), true),
    // new mxConnectionConstraint(new mxPoint(0.25, 1), true),
    new mxConnectionConstraint(new mxPoint(0.5, 1), true),
    // new mxConnectionConstraint(new mxPoint(0.75, 1), true)
];

mxPolyline.prototype.constraints = null;


export class Canvas extends mxGraph {

    private grid: Grid;

    createMenuSelector(): void {
        let menuSelector = new MenuSelector(this);
        menuSelector.addMenu(new CreateLayerMenuItem(this.dialogService));
    }

    constructor(public container: HTMLElement,
                public dialogService: DialogService) {
        super(container, new mxGraphModel());
        this.createMenuSelector();
        this.setPanning(true);
        this.setConnectable(true);
        this.foldingEnabled = true;
        this.setHtmlLabels(true);
        this.gridSize = 32;
        this.extendParents = true;
        this.extendParentsOnAdd = true;
        this.cellRenderer = new CellRenderer();
        this.grid = new Grid(this);
        this.grid.draw();
        // this.addMouseListener(new MenuHoverListener(this));
        this.recursiveResize = false;

        this.createDefaultStyles();
    }

    createVertexHandler(state: mxCellState): mxVertexHandler {
        return new VertexHandler(state);
    }

    createGraphHandler() : mxGraphHandler {
        return new GraphHandler(this);
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
        if (mxUtils.isNode(cell.value)) {
            return cell.getAttribute('label');
        }
        return super.convertValueToString(cell);
    }


    cellsMoved(cells: mxCell[],
               dx: number,
               dy: number,
               disconnect: boolean,
               constrain: boolean,
               extend: boolean): void {
        // let toMove = [];
        // for(let cell of cells) {
        //     if(cell.getAttribute('synthetic')) {
        //         toMove.push(cell);
        //         let layer = (cell as any) as LayeredNode<any>;
        //         for(let member of layer.members) {
        //             toMove.push(member);
        //         }
        //     }
        // }
        // super.cellsMoved(toMove, dx, dy, disconnect, constrain, extend);
    }

    moveCells(cells: Layer[],
              dx: number,
              dy: number,
              clone?: boolean,
              parent?: Layer,
              event?: mxMouseEvent): Layer[] {
        return super.moveCells(cells, dx, dy, clone, parent, event);
    }


    selectCellForEvent(cell: mxCell) {
        if (cell.getAttribute('constituent') === '1') {
            let delegate = this.model.getParent(cell);
            while (delegate.getAttribute('constituent') === '1') {
                delegate = this.model.getParent(delegate);
            }
            super.selectCellForEvent(delegate);
        } else {
            super.selectCellForEvent(cell);
        }
    }

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
        if (cell.getAttribute('rresize') === '0') {
            return cell.geometry;
        } else {
            return super.getPreferredSizeForCell(cell);
        }
    }

    removeCells(cells: mxCell[]) {
        return super.removeCells(cells);
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
}
