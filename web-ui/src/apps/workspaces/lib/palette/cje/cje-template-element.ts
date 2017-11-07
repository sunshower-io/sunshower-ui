
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
    mxPerimeter,
    mxConstants
} from "mxgraph";


import {Role} from "lib/common/security/model/user";
import {Vertex as TaskVertex} from 'lib/designer/model/graph';

export class CJEInstallation extends Vertex {
    style: string = 'cje-template-style';
} 


export class CJETemplateElementFactory extends DefaultElementFactory implements ElementLoader {


    rolesAllowed        : Role[] = [new Role('admin')];
    elementName         : string = 'Template';
    displayIcon         : string = 'assets/icons/plugins/cje/jenkins.svg';
    paletteIcon         : string = 'assets/icons/plugins/cje/jenkins.svg';


    initialize(canvas: Canvas, element: HTMLElement): void {
        super.initialize(canvas, element);
    }

    preInitialize(canvas: Canvas) {
        this.createStyle(canvas);
        canvas.registerProvider(this);
    }

    newElement(x: number, y: number, event: Event, canvas: Canvas, target: any): Drawable {
        return new CJEInstallation('CJE', x, y, 74, 74);
    }

    isHostableBy(e: Drawable): boolean {
        return true;
    }



    handles(key: string): boolean {
        return CJEInstallation.name === key;
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





    load(model: Canvas, v: TaskVertex): Drawable {
        return new CJEInstallation (
            v.name,
            v.layout.x,
            v.layout.y,
            v.layout.width,
            v.layout.height,
            v,
            v.id
        );
    }

    resolveElementLoader(key: string): ElementLoader {
        return this;
    }

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
                'cje-template-style',
                style
            );
    }
}
