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

import {SecurityGroup} from "lib/hal/infrastructure/security/security-group";


export class SecurityGroupElement extends Vertex implements SecurityGroup {


}

export class SecurityGroupElementFactory extends DefaultElementFactory {
    elementName         : string = 'Security Group';
    displayIcon         : string = 'assets/icons/designer/security-group.svg';




    /**
     *
     * @param x
     * @param y
     * @param event
     * @param canvas
     * @param target
     * @returns {SecurityGroupElement}
     */

    newElement(
        x: number,
        y: number,
        event: Event,
        canvas: Canvas,
        target: any
    ): Drawable {
        return new SecurityGroupElement('security group', x, y, 200, 200);
    }
}


