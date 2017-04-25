import {Canvas} from './canvas';
import {mxUtils as GraphUtilities} from 'mxgraph';


export interface ElementFactoryProvider {


    load() : Promise<ElementFactory[]>;


}


export interface ElementFactory {
    elementName         : string;
    displayIcon         : string;
}



export class Palette {

    private canvas          : Canvas;

    constructor(
        private factoryProvider: ElementFactoryProvider
    ) {

    }

    public bind(canvas : Canvas) : void {
        this.canvas = canvas;
    }

}