import {Canvas} from './canvas';
import {mxUtils as GraphUtilities} from 'mxgraph';


export interface ElementFactoryProvider {


    load() : Promise<ElementFactory[]>;


}


export interface ElementFactory {

}



export class Palette {


    constructor(
        private factoryProvider: ElementFactoryProvider
    ) {

    }

    public bind(canvas : Canvas) : void {

    }

}