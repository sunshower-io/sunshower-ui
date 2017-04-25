import {ElementFactory} from "lib/designer/canvas/palette";
import {RenderableElement as Element} from 'lib/designer/model';
import {ComputeNodeTemplate} from 'lib/hal/infrastructure/compute';


export class ComputeNodeTemplateElement extends Element implements ComputeNodeTemplate {

    constructor() {
        super();
    }

}

export class SecurityGroupElementFactory implements ElementFactory {
    elementName         : string = 'Security Group';
    displayIcon         : string = 'assets/icons/designer/security-group.svg';
}


export class ComputeNodeTemplateElementFactory implements ElementFactory {
    elementName         : string = 'Node Template';
    displayIcon         : string = 'assets/icons/designer/virtual-machine.svg'
}