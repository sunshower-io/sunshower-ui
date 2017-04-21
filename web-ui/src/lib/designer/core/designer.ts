import {Canvas} from 'lib/designer/canvas';
import {CanvasModel} from 'lib/designer/model';


export class Designer {


    private canvas : Canvas;
    private model  : CanvasModel;

    constructor(
        private readonly container: HTMLElement,
        model: CanvasModel = new CanvasModel()
    ) {
        this.canvas = new Canvas(container, model);
        this.canvas.gridSize = 60;
    }

    getCanvas() : Canvas {
        return this.canvas;
    }

}