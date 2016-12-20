import {
    mxCell,
    mxUtils,
    mxGraph,
    mxGraphModel,
    mxRubberband,
    mxConstants,
    mxRectangle,
    mxShape,
    mxPoint,
    mxConnectionHandler,
    mxPolyline,
    mxGeometry,
    Layer,
    mxConnectionConstraint,
    mxGraphHandler
} from "mxgraph";

import {ConnectionHandler} from './connection-handler';
import {Grid} from "../grid";

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


export class Builder extends mxGraph {

    private grid: Grid;

    constructor(public container: HTMLElement) {
        super(container, new mxGraphModel());
        new mxRubberband(this);
        this.setPanning(true)
        this.setConnectable(true);
        this.foldingEnabled = false;
        this.setHtmlLabels(true);
        this.gridSize = 32;
        this.grid = new Grid(this);
        this.grid.draw();
        // this.addMouseListener(new MenuHoverListener(this));
        this.recursiveResize = false;
        mxGraphHandler.prototype.guidesEnabled = true;

        this.getStylesheet()
            .getDefaultEdgeStyle()
            ['edgeStyle'] =
            'orthogonalEdgeStyle';

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


    selectCellForEvent(cell: mxCell) {
        if (cell.getAttribute('constituent') === '1') {
            let delegate = this.model.getParent(cell);
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


    getPreferredSizeForCell(cell: Layer): mxRectangle {
        if (cell.getAttribute('rresize') === '0') {
            return cell.geometry;
        } else {
            return super.getPreferredSizeForCell(cell);
        }
    }

    removeCells(cells: mxCell[]) {
        return super.removeCells(cells);
    }


    getAllConnectionConstraints(terminal: Layer, source: Layer): mxConnectionConstraint[] {
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
}