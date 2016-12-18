import {
    mxGraph,
    mxUtils,
    mxConstants,
    mxSvgCanvas2D,
} from 'mxgraph';

export default class ImageExporter {

    constructor(public readonly graph:mxGraph) {

    }

    render() : void {
        let
            graph = this.graph,
            svgDoc = mxUtils.createXmlDocument(),
            root = (svgDoc.createElementNS != null) ?
            svgDoc.createElementNS(mxConstants.NS_SVG, 'svg') :
            svgDoc.createElement('svg'),
            bounds = graph.getGraphBounds();

        if (svgDoc.createElementNS == null) {
            root.setAttribute('xmlns', mxConstants.NS_SVG);
            root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
        }
        else {
            root.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', mxConstants.NS_XLINK);
        }

        root.setAttribute('width', (bounds.x + bounds.width + 4) + 'px');
        root.setAttribute('height', (bounds.y + bounds.height + 4) + 'px');
        root.setAttribute('version', '1.1');
        svgDoc.appendChild(root);
        let svgCanvas = new mxSvgCanvas2D(root);
        console.log(svgCanvas);
    }


}