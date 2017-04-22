import {Grid} from "./grid";
import {mxGraphBounds, mxRubberband} from "mxgraph";
import {Point2D} from "lib/common/math";
import {Canvas} from 'lib/designer/canvas';
import {CanvasModel} from 'lib/designer/model';
import {CanvasSelector} from "./selector";

export class Designer {


    private canvas : Canvas;
    private model  : CanvasModel;

    constructor(
        private readonly container: HTMLElement,
        model: CanvasModel = new CanvasModel(),
        options?: DesignerOptions
    ) {
        let canvas = new Canvas(container, model),
            selector = new CanvasSelector(canvas, container);
        this.canvas = canvas;


    }


    getCanvas() : Canvas {
        return this.canvas;
    }

}


export class DesignerOptions {

    width                   ?: number;
    height                  ?: number;


    relativeLocation        ?: Point2D;
}
