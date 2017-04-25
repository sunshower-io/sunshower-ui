import {DefaultElementFactory, ElementFactory} from "lib/designer/canvas/palette";
import {RenderableElement as Element} from 'lib/designer/model';
import {ComputeNodeTemplate} from 'lib/hal/infrastructure/compute';


export class ComputeNodeTemplateElement extends Element implements ComputeNodeTemplate {

    constructor() {
        super();
    }

}

export class SecurityGroupElementFactory extends DefaultElementFactory {
    elementName         : string = 'Security Group';
    displayIcon         : string = 'assets/icons/designer/security-group.svg';
}


export class ComputeNodeTemplateElementFactory extends DefaultElementFactory {
    elementName         : string = 'Node Template';
    displayIcon         : string = 'assets/icons/designer/virtual-machine.svg'
}