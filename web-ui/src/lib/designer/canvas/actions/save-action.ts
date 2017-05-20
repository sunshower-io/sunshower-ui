import {Canvas} from '../canvas'
import {JsonCodec} from "../../codec/json-codec";
export class SaveAction {


    run(canvas: Canvas) :void {
        let g = new JsonCodec().export(canvas.getModel(), canvas);
        console.log(JSON.stringify(g));
    }

}
