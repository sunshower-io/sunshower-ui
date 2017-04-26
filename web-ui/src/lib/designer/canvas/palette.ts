import {Canvas} from './canvas';
import {
    ImportFunction,
    mxUtils
} from 'mxgraph';
import {Drawable} from "lib/designer/elements";


export interface ElementFactoryProvider {


    load(): Promise<ElementFactory[]>;


}


export interface ElementFactory {
    elementName: string;
    displayIcon: string;
    importFunction: ImportFunction;

    initialize(canvas: Canvas, element: HTMLElement): void;

    newElement(
        x:number,
        y: number,
        event: Event,
        canvas: Canvas,
        target:any
    ) : Drawable;


}

export type CellFactory = (factory: ElementFactory) => ImportFunction;

export let DefaultCellFactory : CellFactory = (factory: ElementFactory) => {

    return (
        canvas: Canvas,
        event: any,
        target: any,
        x: number,
        y: number
    ) => {
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



    abstract newElement(
        x:number,
        y: number,
        event: Event,
        canvas: Canvas,
        target:any
    ) : Drawable;

    initialize(canvas: Canvas, element: HTMLElement): void {
        let dragImage = element.cloneNode(true) as any;
        dragImage.style.width = '32px';
        dragImage.style.height = '32px';
        mxUtils.makeDraggable(element, canvas, this.importFunction, dragImage);
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