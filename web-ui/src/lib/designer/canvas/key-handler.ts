import {mxDefaultKeyHandler} from "mxgraph";
import {Canvas} from "./canvas";


export class KeyHandler extends mxDefaultKeyHandler {

    constructor(canvas : Canvas) {
        super(canvas);
    }

}