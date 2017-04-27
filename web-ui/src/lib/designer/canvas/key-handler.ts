import {mxDefaultKeyHandler} from "mxgraph";
import {Canvas} from "./canvas";

import * as Keypress from 'keypress';
export class KeyHandler extends mxDefaultKeyHandler {

    private readonly keyManager:Keypress.Listener;
    constructor(canvas : Canvas) {
        super(canvas);
        let keyManager = new Keypress.Listener();
        keyManager.simple_combo('shift s', () => {
            console.log("c");
        });
        this.keyManager = keyManager;
        console.log("F");
    }

    stop() {
        // this.keyManager.stop_listening();
    }

}