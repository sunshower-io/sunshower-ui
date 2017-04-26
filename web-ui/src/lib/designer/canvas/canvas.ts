import {
    mxGraph,
    mxClient, Layer
} from "mxgraph";
import {Grid} from 'lib/designer/core';
import {CanvasModel} from 'lib/designer/model';
import {AddCellAction} from "./actions/add-cell-action";
import {CommandManager} from "lib/common/edit/command/command";
import {RenderableElement} from "lib/designer/model/elements";


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

    addAndRecord(cell: Layer, parent: Layer, index?: number, source?: Layer, target?: Layer): Layer {
        this.commandManager.execute(new AddCellAction(cell as RenderableElement, this));
        return cell;
    }

    public addGrid(grid: Grid): void {
        if(!this.grids) {
            this.grids = [grid];
        } else {
            this.grids.push(grid);
        }
        for(let grid of this.grids) {
            grid.draw();
        }
    }

    public getModel(): CanvasModel {
        return this.model;
    }


}

export class CanvasOptions {


}