import {Canvas} from "./canvas";

// import * as Keypress from 'keypress';
import {Chord} from "./chord";
import {Action} from "./action";


export class KeyHandler {

    private readonly chords     : {[key:string] : Action};
    // private readonly keyManager:Keypress.Listener;
    constructor(private readonly canvas : Canvas) {
        this.chords = {};
        // let keyManager = new Keypress.Listener();
        // this.keyManager = keyManager;
    }

    stop() {
        // this.keyManager.stop_listening();
    }


    public bind(chord: Chord, action:Action) : void {
        this.chords[chord.key] = action;
        // this.keyManager.simple_combo(
        //     chord.values.join(' '), () => {
        //     action.run(this.canvas);
        // });
    }

    public unbind(chord: Chord) : Action {
        let action = this.chords[chord.key];
        delete this.chords[chord.key];
        return action;
    }
}