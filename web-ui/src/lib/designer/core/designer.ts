import {Canvas} from 'lib/designer/canvas';
import {CanvasModel} from 'lib/designer/model';
import {mxRubberband} from "mxgraph";
import {Grid} from "./grid";


export class Designer {


    private canvas : Canvas;
    private model  : CanvasModel;

    constructor(
        private readonly container: HTMLElement,
        model: CanvasModel = new CanvasModel()
    ) {
        let canvas = new Canvas(container, model);
        new mxRubberband(canvas);
        this.canvas = canvas;
    }



    getCanvas() : Canvas {
        return this.canvas;
    }

}

