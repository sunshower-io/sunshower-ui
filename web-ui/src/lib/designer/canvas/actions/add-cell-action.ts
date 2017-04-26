import {Layer} from "mxgraph";
import {Cloneable} from 'lib/common/lang';

import {Canvas} from "lib/designer/canvas";
import {Command} from "lib/common/edit/command";
import {RenderableElement} from "lib/designer/model/elements";

export class AddCellAction implements Command {


    constructor(
        private cells: RenderableElement[],
        private canvas: Canvas,
        private parent ?: Layer
    ) {

    }



    redo(): void {
        this.canvas.getModel().beginUpdate();
        try {
            for (let cell of this.cells) {
                cell.addTo(this.canvas);
            }
        } finally {
            this.canvas.getModel().endUpdate();
        }
    }

    undo(): void {
        this.canvas.removeCells(this.cells);
    }

    execute(): void {
        this.redo();
    }

    clone<U extends Cloneable<Command>>(): AddCellAction {
        return this;
    }

}