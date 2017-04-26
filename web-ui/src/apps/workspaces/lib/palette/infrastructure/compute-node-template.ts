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


export class ComputeNodeTemplateElement extends Vertex implements ComputeNodeTemplate {


}


export class ComputeNodeTemplateElementFactory extends DefaultElementFactory {
    elementName         : string = 'Node Template';
    displayIcon         : string = 'assets/icons/designer/virtual-machine.svg';


    newElement(x: number, y: number, event: Event, canvas: Canvas, target: any): Drawable {
        return new ComputeNodeTemplateElement('node', x, y, 300, 300);
    }
}