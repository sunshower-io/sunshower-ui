import {Canvas} from 'lib/designer/canvas'
import {JsonCodec} from "lib/designer/codec/json-codec";
export class SaveAction {

    run(canvas: Canvas) :void {
        console.log(canvas.getView().getTranslate());
        let g = new JsonCodec().export(canvas.getModel(), canvas);
        canvas.dispatch({
            type    : 'canvas-saved',
            data    : g
        });
    }

}
