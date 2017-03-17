import {Canvas} from "./core/canvas";
import {Class} from "common/lib/lang";
import {Layer, mxCellState} from "mxgraph";
export class CanvasUtilities {



    public static ofType<T>(requestedType:Class<T>) : (Layer) => boolean {
        return (l:Layer) => {
            return (l instanceof requestedType);
        }
    }

    public static resolveParent(
        canvas: Canvas,
        x: number,
        y: number,
        predicate:(Layer) => boolean
    ): Layer {
            let
                f = (state:mxCellState, x1:number, y1:number) => {
                    return !predicate(state.cell);
                },
                defaultParent = canvas.getDefaultParent(),
                parent = canvas.getCellAt(x, y, defaultParent, true, false, f);
            console.log("PARENT", parent);
            return parent;
    }
}