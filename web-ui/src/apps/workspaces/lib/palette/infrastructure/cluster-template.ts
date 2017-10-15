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
    mxConstants, mxEvent
} from "mxgraph";
import {Vertex as TaskVertex} from 'lib/designer/model/graph';
import {Role} from "lib/common/security/model/user";
import {ApplicationContextHolder} from "lib/common/application-context";
import {DialogService} from "aurelia-dialog";
import {SyntaxAwareTextEditor} from "lib/editor/text/syntax-aware-text-editor";


export class TemplateClusterTemplate extends Vertex implements ComputeNodeTemplate {

    style: string = 'template-cluster-template-style';

    onDoubleClick(sender, e:mxEvent) : void {
        let container = ApplicationContextHolder.getContainer(),
            dialogService = container.get(DialogService) as DialogService;
        dialogService.open({
            model: e.getProperty('cell'),
            viewModel: SyntaxAwareTextEditor
        }).then(t => {})
    }
}


export class ClusterTemplateElementFactory extends DefaultElementFactory implements ElementLoader{


    rolesAllowed        : Role[] = [new Role('admin')];
    elementName         : string = 'Template';
    displayIcon         : string = 'assets/icons/designer/virtual-cluster.svg';
    paletteIcon         : string = 'assets/icons/designer/virtual-cluster.svg';


    initialize(canvas: Canvas, element: HTMLElement): void {
        super.initialize(canvas, element);
        this.createStyle(canvas);
    }

    load(model: Canvas, v: TaskVertex): Drawable {
        return new TemplateClusterTemplate(
            v.name, 
            v.layout.x, 
            v.layout.y, 
            v.layout.width, 
            v.layout.height, 
            v
        );
    }



    newElement(x: number, y: number, event: Event, canvas: Canvas, target: any): Drawable {
        return new TemplateClusterTemplate('template cluster', x, y, 74, 74);
    }

    isHostableBy(e: Drawable): boolean {
        return true;
    }
    
    onDoubleClick(sender, e) : void {
        alert("Sup");
    }


    resolveElementLoader(key: string): ElementLoader {
        return this;
    }

    handles(key: string): boolean {
        return "TemplateClusterTemplate" === key; 
    }

    preInitialize(canvas: Canvas) : void {
        this.createStyle(canvas);
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
                'template-cluster-template-style',
                style
            );
    }
}
