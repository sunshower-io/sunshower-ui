import {Canvas} from "lib/designer/canvas/canvas";
import {Palette} from "lib/designer/canvas/palette";


import {
    containerless,
    customElement,
    bindable
} from "aurelia-framework";


@customElement('element-panel')
export class ElementPanel {


    private canvas          : Canvas;


    name         : string = "whatever";
    @bindable
    public active: boolean = true;

    setCanvas(canvas:Canvas) : void {
        this.canvas = canvas;
    }

}