
import {
    autoinject,
    containerless,
    customElement
} from "aurelia-framework";
import {
    Grid,
    Designer
} from 'lib/designer/core'

import {
    Canvas
} from 'lib/designer/canvas';


@autoinject
@containerless
@customElement('infrastructure-designer')
export default class InfrastructureDesigner {


    private designer            : Designer;
    private canvas              : Canvas;
    private element             : HTMLElement;

    constructor() {


    }

    attached() : void {
        let designer = new Designer(this.element),
            canvas = designer.getCanvas();

        // canvas.addGrid(new Grid(canvas, {
        //     strokeStyle: '#E2E2E2',
        //     gridSize   : 30,
        // }));
        //
        // canvas.addGrid(new Grid(canvas, {
        //     strokeStyle: '#A0A0A0',
        //     gridSize   : 90,
        // }));



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