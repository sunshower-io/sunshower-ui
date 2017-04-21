import {Canvas} from 'lib/designer/canvas';

export default class Designer {

    private canvas : Canvas;

    constructor(private readonly container: HTMLElement) {
        this.canvas = new Canvas(container);
    }

}