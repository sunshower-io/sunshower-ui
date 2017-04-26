import {Layer} from "mxgraph";
import {Cloneable} from 'lib/common/lang';

import {Canvas} from "lib/designer/canvas";
import {Command} from "lib/common/edit/command";
import {RenderableElement} from "lib/designer/model/elements";

export class AddCellAction implements Command {


    constructor(
        private cell: RenderableElement,
        private canvas: Canvas,
        private parent ?: Layer
    ) {

    }



    redo(): void {
        this.canvas.addCell(this.cell, null);
        // this.cell.addTo(this.canvas);
    }

    undo(): void {
        this.canvas.removeCells([this.cell]);
    }

    execute(): void {
        this.redo();
    }

    clone<U extends Cloneable<Command>>(): AddCellAction {
        return this;
    }

}