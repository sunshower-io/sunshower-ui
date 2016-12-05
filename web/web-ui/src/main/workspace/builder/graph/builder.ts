import {
    mxCell,
    mxUtils,
    mxGraph,
    mxGraphModel,
    mxRubberband,
    mxConstants,
    mxConnectionHandler
} from "mxgraph";

import {ConnectionHandler} from './connection-handler';
import {TaskManager} from "task/tasks";
import {Grid} from "../grid";
import {MenuHoverListener} from "../listeners/hover-listener";
import {mxGraphHandler} from "mxgraph";

mxConstants.HANDLE_FILLCOLOR = '#239AE8';
mxConstants.HANDLE_STROKECOLOR = '#239AE8';
mxConstants.VERTEX_SELECTION_COLOR = '#0000FF';

mxRubberband.defaultOpacity = 1;



export class Builder extends mxGraph {

    private grid:Grid;

    constructor(
        public container:HTMLElement,
        public taskManager: TaskManager
    ) {
        super(container, new mxGraphModel());
        new mxRubberband(this);
        this.setPanning(true)
        this.setConnectable(true);
        this.foldingEnabled = false;
        this.gridSize = 40;
        this.grid = new Grid(this);
        this.grid.draw();
        this.addMouseListener(new MenuHoverListener(this));
        mxGraphHandler.prototype.guidesEnabled = true;
    }


    createConnectionHandler(): mxConnectionHandler {
        return new ConnectionHandler(this);
    }

    redraw() : void {
        this.grid.draw();
    }


    convertValueToString(cell: mxCell): string {
        if(mxUtils.isNode(cell.value)) {
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


    removeCells(cells: mxCell[]) {
        return super.removeCells(cells);
    }
}