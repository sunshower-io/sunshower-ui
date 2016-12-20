import {
    mxGraph,
    mxUtils,
    mxConstants,
    mxSvgCanvas2D,
} from 'mxgraph';

export interface ExportResult {
    width       : number;
    height      : number;
    element     : HTMLElement;

}


export class ImageExporter {

    constructor(public readonly graph:mxGraph) {

    }

    render() : ExportResult {

        let graph = this.graph,
            view = graph.view,
            bounds = view.getGraphBounds(),
            viewPane = view.getCanvas();
        return {
            width: bounds.width,
            height: bounds.height,
            element: viewPane as HTMLElement
        };
    }


}