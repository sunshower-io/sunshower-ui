import {
    mxGraph,
    mxClient
} from "mxgraph";
import {Grid} from 'lib/designer/core';
import {CanvasModel} from 'lib/designer/model';


export class Canvas extends mxGraph {

    private grids: Grid[];

    constructor(public readonly container: HTMLElement,
                model: CanvasModel) {
        super(container, model);

        if (!mxClient.isBrowserSupported()) {
            throw new Error("Browser is not supported.  " +
                "Please upgrade to a modern browser"
            );
        }
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