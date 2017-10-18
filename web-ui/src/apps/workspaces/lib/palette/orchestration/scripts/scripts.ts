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
import {Role} from "lib/common/security/model/user";

import {Vertex as TaskVertex} from 'lib/designer/model/graph';
import {ApplicationContextHolder} from "lib/common/application-context";
import {DialogService} from "aurelia-dialog";
import {SyntaxAwareTextEditor} from "lib/editor/text/syntax-aware-text-editor";

export class ScriptTemplateElement extends Vertex implements ComputeNodeTemplate {

    style: string = 'script-template-element-style';

    displayIcon: string = 'assets/icons/plugins/script/script.svg';

    onDoubleClick(sender: any, event: any): void {
        let container = ApplicationContextHolder.getContainer(),
            dialogService = container.get(DialogService) as DialogService;
        dialogService.open({
            model: {
                vertex: event.getProperty('cell'),
                handlers: [{
                    type: 'bash',
                    handler: 'node-handlers::script::bash'
                }, {
                    type: 'ruby',
                    handler: 'node-handlers::script::ruby'
                }, {
                    type: 'python',
                    handler: 'node-handlers::script::python'
                }, {
                    type: 'groovy',
                    handler: 'node-handlers::script::groovy'
                }],

                mappings: [
                    {key: 'node-handlers::script::bash', value: 'ace/mode/sh'},
                    {key: 'node-handlers::script::ruby', value: 'ace/mode/ruby'},
                    {key: 'node-handlers::script::python', value: 'ace/mode/python'},
                    {key: 'node-handlers::script::groovy', value: 'ace/mode/groovy'}
                ],
            },

            viewModel: SyntaxAwareTextEditor
        }).then(t => {
        })
    }

}


export class ScriptTemplateElementFactory extends DefaultElementFactory implements ElementLoader {


    rolesAllowed: Role[] = [new Role('admin')];
    elementName: string = 'Node Template';
    displayIcon: string = 'assets/icons/plugins/script/script.svg';
    paletteIcon: string = 'assets/icons/plugins/script/script.svg';

    preInitialize(canvas: Canvas): void {
        this.createStyle(canvas);
    }

    initialize(canvas: Canvas, element: HTMLElement): void {
        super.initialize(canvas, element);
    }


    newElement(x: number, y: number, event: Event, canvas: Canvas, target: any): Drawable {
        return new ScriptTemplateElement('node', x, y, 74, 74);
    }


    load(model: Canvas, v: TaskVertex): Drawable {
        return new ScriptTemplateElement(
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
        return ScriptTemplateElement.name === key;
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



    protected createStyle(canvas: Canvas): void {
        let style = {};
        style[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';
        style[mxConstants.STYLE_IMAGE] = this.displayIcon;
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
        canvas
            .getStylesheet()
            .putCellStyle(
                'script-template-element-style',
                style
            );
    }
}