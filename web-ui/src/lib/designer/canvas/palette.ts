import {Canvas} from './canvas';
import {
    ImportFunction,
    mxUtils
} from 'mxgraph';
import {Drawable} from "lib/designer/elements";

import 'velocity-ui';
import {ProtectedObject, Role} from "lib/common/security/model/user";


export interface ElementFactoryProvider {


    load(): Promise<ElementFactory[]>;


}


export interface ElementFactory extends ProtectedObject {

    rolesDenied             : Role[];
    rolesAllowed            : Role[];
    elementName             : string;
    displayIcon             : string;
    paletteIcon             : string;
    importFunction          : ImportFunction;

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


export abstract class DefaultElementFactory implements
    ElementFactory,
    ProtectedObject
{
    elementName                : string;
    displayIcon                : string;
    paletteIcon                : string;
    rolesAllowed               : Role[] = [];
    rolesDenied                : Role[] = [];

    importFunction             : ImportFunction;

    constructor() {
        this.importFunction = DefaultCellFactory(this);
    }


    abstract newElement(x: number,
                        y: number,
                        event: Event,
                        canvas: Canvas,
                        target: any): Drawable;

    initialize(canvas: Canvas, element: HTMLElement): void {
        let
            image = this.createInitialImage(),
            dragSource = mxUtils.makeDraggable(
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


    createInitialImage() : HTMLElement {

        let image: HTMLImageElement = document.createElement('img');
        image.src = this.paletteIcon;
        image.width = 37;
        image.height = 37;
        return image;
    }

    createAnimation() : [any, any]{
        return [{
            scale: 10,
        }, {
            duration: 300,
            delay: 250
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