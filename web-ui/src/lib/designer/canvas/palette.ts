import {Canvas} from './canvas';
import {
    ImportFunction, mxDragSource,
    mxUtils
} from 'mxgraph';
import {Drawable} from "lib/designer/elements";

import 'velocity-ui';


export interface ElementFactoryProvider {


    load(): Promise<ElementFactory[]>;


}


export interface ElementFactory {
    elementName: string;
    displayIcon: string;
    importFunction: ImportFunction;

    initialize(canvas: Canvas, element: HTMLElement): void;

    newElement(x: number,
               y: number,
               event: Event,
               canvas: Canvas,
               target: any): Drawable;


}

export type CellFactory = (factory: ElementFactory) => ImportFunction;

export let DefaultCellFactory: CellFactory = (factory: ElementFactory) => {

    return (canvas: Canvas,
            event: any,
            target: any,
            x: number,
            y: number) => {
        if (canvas.canImportCell(target)) {
            canvas.getModel().beginUpdate();
            let renderable: Drawable = null;
            try {
                renderable = factory.newElement(x, y, event, canvas, target);
                renderable.addTo(canvas);
            }
            finally {
                canvas.getModel().endUpdate();
            }
            canvas.setSelectionCell(renderable);
        }
    };


};


export abstract class DefaultElementFactory implements ElementFactory {
    elementName: string;
    displayIcon: string;

    importFunction: ImportFunction;

    constructor() {
        this.importFunction = DefaultCellFactory(this);
    }


    abstract newElement(x: number,
                        y: number,
                        event: Event,
                        canvas: Canvas,
                        target: any): Drawable;

    initialize(canvas: Canvas, element: HTMLElement): void {
        let image: HTMLImageElement = document.createElement('img');
        image.src = this.displayIcon;
        image.width = 37;
        image.height = 37;
        let dragSource = mxUtils.makeDraggable(
            element,
            canvas,
            this.importFunction,
            image
        );

        const [fst, snd] = this.createAnimation();
        (dragSource as any).createDragElement = () => {
            let i = image.cloneNode(true);
            $(i).velocity(fst, snd);
            return i;
        }
    }


    createAnimation() : [any, any]{
        return [{
            scale: 2,
        }, {
            duration: 250,
            delay: 150
        }]
    }
}



export class Palette {

    private canvas: Canvas;

    constructor(private factoryProvider: ElementFactoryProvider) {

    }

    public bind(canvas: Canvas): void {
        this.canvas = canvas;
    }

}