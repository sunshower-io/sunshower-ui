import {
    mxGraph,
    mxClient,
    mxUndoManager,
    mxEvent,
    mxUtils, Layer
} from "mxgraph";
import {Grid} from 'lib/designer/core';
import {CanvasModel} from 'lib/designer/model';
import {KeyHandler} from "./key-handler";
import {Chord} from "./chord";
import {Action} from "./action";
import {RenderableElement} from "../model/elements";
import {
    ElementFactory, ElementLoader,
} from "./palette";


export class Canvas extends mxGraph {


    private grids: Grid[];
    private undoListener: any;

    private providers: ElementFactory[];


    private keyHandler: KeyHandler;
    readonly historyManager: mxUndoManager;

    constructor(public readonly container: HTMLElement,
                model: CanvasModel) {
        super(container, model);

        if (!mxClient.isBrowserSupported()) {
            throw new Error("Browser is not supported.  " +
                "Please upgrade to a modern browser"
            );
        }
        this.foldingEnabled = false;
        this.setConnectable(true);

        this.keyHandler = this.createKeyHandler();
        this.historyManager = this.createUndoManager();

    }

    public register(chord: Chord, action: Action): void {
        this.keyHandler.bind(chord, action);
    }

    public unregister(chord: Chord): void {
        this.keyHandler.unbind(chord);

    }

    deactivate() {
        this.keyHandler.stop();
    }

    activate(): void {

    }

    resolveElementLoader(key: string): ElementLoader {
        for(let provider of this.providers) {
            if(provider.handles(key)) {
                return provider.resolveElementLoader(key);
            }
        }
        throw new Error("This canvas cannot handle any elements keyed by: " + key);

    }

    registerProvider(provider: ElementFactory): void {
        if (!this.providers) {
            this.providers = [];
        }
        this.providers.push(provider);
    }


    getLabel(a: Layer): HTMLElement {
        if (a instanceof RenderableElement) {
            let re = <RenderableElement> a;
            if (re.labelVisible) {
                let label = super.getLabel(a);
                return $(`<div class="default-label">${label}</div>`).get(0);
            }
        }
        return null;
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

    protected createKeyHandler(): KeyHandler {
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

