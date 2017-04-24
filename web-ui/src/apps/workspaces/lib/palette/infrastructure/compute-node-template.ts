import {ElementFactory} from "lib/designer/canvas/palette";
import {RenderableElement as Element} from 'lib/designer/model';
import {ComputeNodeTemplate} from 'lib/hal/infrastructure/compute';


export class ComputeNodeTemplateElement extends Element implements ComputeNodeTemplate {

    constructor() {
        super();
    }

}

export class ComputeNodeTemplateElementFactory implements ElementFactory {

}