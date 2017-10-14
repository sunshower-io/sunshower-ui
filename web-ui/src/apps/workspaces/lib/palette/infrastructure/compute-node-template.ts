import {
    DefaultElementFactory, ElementLoader
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
import {Role} from "lib/common/security/model/user";

import {Vertex as TaskVertex} from 'lib/designer/model/graph';

export class ComputeNodeTemplateElement extends Vertex implements ComputeNodeTemplate {

    style: string = 'compute-node-template-style';


    onClick(sender:any, event:any) : void {
        
        
    }
    
}


export class ComputeNodeTemplateElementFactory extends DefaultElementFactory implements ElementLoader {


    rolesAllowed        : Role[] = [new Role('admin')];
    elementName         : string = 'Node Template';
    displayIcon         : string = 'assets/icons/designer/vm.svg';
    paletteIcon         : string = 'assets/icons/designer/vm.svg';


    initialize(canvas: Canvas, element: HTMLElement): void {
        super.initialize(canvas, element);
        this.createStyle(canvas);
    }


    newElement(x: number, y: number, event: Event, canvas: Canvas, target: any): Drawable {
        return new ComputeNodeTemplateElement('node', x, y, 74, 74);
    }


    load(model: Canvas, v: TaskVertex): Drawable {
        return new ComputeNodeTemplateElement (
            v.name,
            v.layout.x,
            v.layout.y,
            v.layout.width,
            v.layout.height,
            v
        );
    }


    isHostableBy(e: Drawable): boolean {
        return true;
    }


    resolveElementLoader(key: string): ElementLoader {
        return this;
    }

    handles(key: string): boolean {
        return ComputeNodeTemplateElement.name === key;
    }

    /**
     *
     * @param x
     * @param y
     * @param event
     * @param canvas
     * @param target
     * @returns {SecurityGroupElement}
     */

    
    
    protected createStyle(canvas:Canvas) : void {
        let style = {};
        style[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';
        style[mxConstants.STYLE_IMAGE] = this.displayIcon;
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
        canvas
            .getStylesheet()
            .putCellStyle(
                'compute-node-template-style',
                style
            );
    }
}