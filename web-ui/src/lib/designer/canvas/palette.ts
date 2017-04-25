import {Canvas} from './canvas';
import {ImportFunction, mxUtils, mxUtils as GraphUtilities} from 'mxgraph';


export interface ElementFactoryProvider {


    load(): Promise<ElementFactory[]>;


}


export interface ElementFactory {
    elementName: string;
    displayIcon: string;
    importFunction: ImportFunction;

    initialize(canvas: Canvas, element:HTMLElement): void;


}


export let DefaultImportFunction: ImportFunction = function (canvas: Canvas,
                                                             event: any,
                                                             target: any,
                                                             x: number,
                                                             y: number) {
    if (canvas.canImportCell(target)) {
        let parent = canvas.getDefaultParent(),
            vertex = null;

        canvas.getModel().beginUpdate();
        try {
            vertex = canvas.insertVertex(parent, null, 'Hello', x, y, 80, 30);
        }
        finally {
            canvas.getModel().endUpdate();
        }
        canvas.setSelectionCell(vertex);
    }


};


export abstract class DefaultElementFactory implements ElementFactory {
    elementName: string;
    displayIcon: string;

    importFunction: ImportFunction = DefaultImportFunction;


    initialize(canvas: Canvas, element:HTMLElement): void {
        // let img = document.createElement('img');
        // img.setAttribute('src', this.displayIcon);
        // img.style.position = 'absolute';
        // img.style.left = '0px';
        // img.style.top = '0px';
        // img.style.width = '500px';
        // img.style.height = '500px';
        // img.style.zIndex = '112341341325';
        //
        let dragImage = element.cloneNode(true) as any;
        dragImage.style.width = '32px';
        dragImage.style.height = '32px';
        mxUtils.makeDraggable(element, canvas, this.importFunction, dragImage);
        // document.body.appendChild(img);
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