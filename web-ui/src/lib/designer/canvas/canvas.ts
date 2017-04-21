

import {
    mxGraph,
    mxClient
} from "mxgraph";

import {CanvasModel} from 'lib/designer/model';


export class Canvas extends mxGraph {

    constructor(
        public readonly container:HTMLElement,
        model: CanvasModel
    ) {
        super(container, model);

        if(!mxClient.isBrowserSupported()) {
            throw new Error("Browser is not supported.  " +
                "Please upgrade to a modern browser"
            );
        }
    }

    public getModel() : CanvasModel {
        return this.model;
    }

}