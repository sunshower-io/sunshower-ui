

import {
    customElement,
    containerless
} from "aurelia-framework";
import {bindable} from "aurelia-templating";
import {
    ElementFactory
} from "../../canvas/palette";
import {Canvas} from "../../canvas/canvas";
import {autoinject} from "aurelia-dependency-injection";


@containerless
@customElement('palette-icon')
export class PaletteIcon {

    @bindable
    canvas               : Canvas;


    @bindable
    factory             : ElementFactory;


    element             : HTMLElement;

    constructor() {

    }


    attached() {
        console.log("CAN", this.canvas);
        this.factory.initialize(this.canvas, this.element);
    }


}