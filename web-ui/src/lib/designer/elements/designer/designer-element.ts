
import {
    autoinject,
    customElement,
    containerless
} from "aurelia-framework";

import {
    Canvas
} from "lib/designer/canvas";

import {
    Designer
} from "lib/designer/core";

@autoinject
@containerless
@customElement('designer')
export class DesignerElement {

    private canvas              : Canvas;
    private designer            : Designer;
    private element             : HTMLElement;



    attached() : void {
        let designer = new Designer(this.element),
            canvas = designer.getCanvas();
        this.setCanvas(canvas);
        this.setDesigner(designer);
    }


    public setCanvas(canvas: Canvas) : void {
        this.canvas = canvas;
    }

    public setDesigner(designer:Designer) : void {
        this.designer = designer;
    }

}