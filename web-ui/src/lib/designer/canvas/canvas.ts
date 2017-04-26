import {
    mxGraph,
    mxClient, Layer, mxConstants, mxUndoManager, mxEvent, mxUtils
} from "mxgraph";
import {Grid} from 'lib/designer/core';
import {CanvasModel} from 'lib/designer/model';


mxConstants.VERTEX_SELECTION_COLOR = '#000000';


mxConstants.HANDLE_FILLCOLOR = '#FF0000';


export class Canvas extends mxGraph {


    private grids: Grid[];
    private undoListener: any;

    private historyManager: mxUndoManager;

    constructor(public readonly container: HTMLElement,
                model: CanvasModel) {
        super(container, model);

        if (!mxClient.isBrowserSupported()) {
            throw new Error("Browser is not supported.  " +
                "Please upgrade to a modern browser"
            );
        }

        this.historyManager = this.createUndoManager();
    }

    private createUndoManager() {
        let undoMgr = new mxUndoManager();
        this.undoListener = function (sender, evt) {
            undoMgr.undoableEditHappened(evt.getProperty('edit'));
        };

        let listener = mxUtils.bind(this, function (sender, evt) {
            this.undoListener.apply(this, arguments);
        });

        this.getModel().addListener(mxEvent.UNDO, listener);
        this.getView().addListener(mxEvent.UNDO, listener);

        let undoHandler = (sender, evt) => {
            let cand = this.getSelectionCellsForChanges(evt.getProperty('edit').changes),
                model = this.getModel(),
                cells = [];
            for (var i = 0; i < cand.length; i++) {
                if ((model.isVertex(cand[i]) || model.isEdge(cand[i])) && this.view.getState(cand[i]) != null) {
                    cells.push(cand[i]);
                }
            }
            this.setSelectionCells(cells);
        };

        undoMgr.addListener(mxEvent.UNDO, undoHandler);
        undoMgr.addListener(mxEvent.REDO, undoHandler);
        return undoMgr;
    }

    listener: (a, b) => void = (e: any, f: any) => {
        this.historyManager.undoableEditHappened(f.getProperty('edit'));
    };


    undo(): void {
        this.historyManager.undo();
    }

    redo(): void {
        this.historyManager.redo();
    }

    public addGrid(grid: Grid): void {
        if (!this.grids) {
            this.grids = [grid];
        } else {
            this.grids.push(grid);
        }
        for (let grid of this.grids) {
            grid.draw();
        }
    }

    public getModel(): CanvasModel {
        return this.model;
    }


}

export class CanvasOptions {


}