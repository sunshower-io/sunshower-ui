import {
    DefaultElementFactory
} from "lib/designer/canvas/palette";
import {
    Canvas
} from "lib/designer/canvas/canvas";


import {
    Drawable,
    RenderableVertex as Vertex
} from 'lib/designer/model';

import {
    ComputeNodeTemplate
} from 'lib/hal/infrastructure/compute';
import {
    mxPerimeter,
    mxConstants
} from "mxgraph";


export class ComputeNodeTemplateElement extends Vertex implements ComputeNodeTemplate {

    style: string = 'compute-node-template-style';
}


export class ComputeNodeTemplateElementFactory extends DefaultElementFactory {
    elementName         : string = 'Node Template';
    displayIcon         : string = 'assets/icons/designer/virtual-machine.svg';
    paletteIcon         : string = 'assets/icons/designer/virtual-machine.svg';


    initialize(canvas: Canvas, element: HTMLElement): void {
        super.initialize(canvas, element);
        this.createStyle(canvas);
    }


    newElement(x: number, y: number, event: Event, canvas: Canvas, target: any): Drawable {
        return new ComputeNodeTemplateElement('node', x, y, 74, 74);
    }

    protected createStyle(canvas:Canvas) : void {
        let style = {};
        style[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';
        style[mxConstants.STYLE_IMAGE] = this.displayIcon;
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        canvas
            .getStylesheet()
            .putCellStyle(
                'compute-node-template-style',
                style
            );
    }
}