
import {Action} from "../action";
import {Canvas} from "../canvas";
export class UndoAction implements Action {
    run(canvas: Canvas): void {
        canvas.historyManager.undo();
    }
}