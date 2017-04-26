import {
    mxGraph,
    mxClient, Layer, mxConstants
} from "mxgraph";
import {Grid} from 'lib/designer/core';
import {CanvasModel} from 'lib/designer/model';
import {AddCellAction} from "./actions/add-cell-action";
import {CommandManager} from "lib/common/edit/command/command";
import {RenderableElement} from "lib/designer/model/elements";


mxConstants.VERTEX_SELECTION_COLOR = '#000000';


mxConstants.HANDLE_FILLCOLOR = '#FF0000';


export class Canvas extends mxGraph {



    private grids: Grid[];

    private commandManager: CommandManager;

    constructor(public readonly container: HTMLElement,
                model: CanvasModel) {
        super(container, model);

        if (!mxClient.isBrowserSupported()) {
            throw new Error("Browser is not supported.  " +
                "Please upgrade to a modern browser"
            );
        }


        this.commandManager = new CommandManager();
    }


    cellsAdded(cells: Layer[],
               parent: Layer,
               index: number,
               source: Layer,
               target: Layer,
               absolute?: boolean,
               constrain?: boolean): void {
        super.cellsAdded(cells, parent, index, source, target, absolute, constrain);
        this.commandManager.record(
            new AddCellAction(
                cells as RenderableElement[],
                this,
                parent
            ));
    }




    undo(): void {
        this.commandManager.undo();
    }

    redo(): void {
        this.commandManager.redo();
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