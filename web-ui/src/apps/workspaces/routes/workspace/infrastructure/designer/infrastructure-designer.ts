
import {
    autoinject,
    containerless,
    customElement,
    bindable
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

    @bindable
    private panelActive         : boolean;

    constructor() {


    }

    attached() : void {
        this.panelActive = true;
        let designer = new Designer(this.element),
            canvas = designer.getCanvas();

        // canvas.addGrid(new Grid(canvas, {
        //     strokeStyle: '#E2E2E2',
        //     gridSize   : 30,
        // }));

        canvas.addGrid(new Grid(canvas, {
            strokeStyle: 'white',
            gridSize   : 64,
        }));



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