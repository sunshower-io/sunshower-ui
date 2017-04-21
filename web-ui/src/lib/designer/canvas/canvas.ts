

import {mxGraph} from "mxgraph";


export class Canvas extends mxGraph {

    constructor(public readonly container:HTMLElement) {
        super();
    }

}