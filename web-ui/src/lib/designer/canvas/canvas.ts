import {
    mxGraph,
    mxClient,
    mxUndoManager,
    mxEvent,
    mxUtils
} from "mxgraph";
import {Grid} from 'lib/designer/core';
import {CanvasModel} from 'lib/designer/model';
import {KeyHandler} from "./key-handler";



export class Canvas extends mxGraph {


    private grids               : Grid[];
    private undoListener        : any;

    private keyHandler          : KeyHandler;
    private historyManager      : mxUndoManager;

    constructor(public readonly container: HTMLElement,
                model: CanvasModel) {
        super(container, model);

        if (!mxClient.isBrowserSupported()) {
            throw new Error("Browser is not supported.  " +
                "Please upgrade to a modern browser"
            );
        }

        this.keyHandler =  this.createKeyHandler();
        this.historyManager = this.createUndoManager();

    }

    deactivate() {
        // this.keyHandler.stop();
    }

    activate() : void {

    }



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

    protected createKeyHandler() : KeyHandler {
        let kh = new KeyHandler(this);
        return kh;
    }


    protected createUndoManager() {
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
                if ((model.isVertex(cand[i]) ||
                    model.isEdge(cand[i])) &&
                    this.view.getState(cand[i]) != null
                ) {
                    cells.push(cand[i]);
                }
            }
            this.setSelectionCells(cells);
        };
        undoMgr.addListener(mxEvent.UNDO, undoHandler);
        undoMgr.addListener(mxEvent.REDO, undoHandler);
        return undoMgr;
    }

}

export class CanvasOptions {


}