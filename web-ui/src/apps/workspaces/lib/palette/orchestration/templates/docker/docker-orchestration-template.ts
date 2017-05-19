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
    mxPerimeter,
    mxConstants
} from "mxgraph";
import {
    DockerManagerNode,
    DockerWorkerNode
} from "./docker-nodes";

import {Role} from "lib/common/security/model/user";

mxConstants.VERTEX_SELECTION_COLOR = 'none';
mxConstants.HANDLE_FILLCOLOR = 'none';
mxConstants.HANDLE_STROKECOLOR = 'none';


export class DockerOrchestrationTemplateProviderElement extends Vertex {

    labelVisible = false;

    style: string = "docker-group-style";
    constructor(x: number, y: number) {
        super('', x - 160, y, 320, 100);
        this.addChild(new DockerManagerNode('manager', 10, 30, 70, 70));
        this.addChild(new DockerWorkerNode('worker', 300, 30, 70, 70));
    }


}

export class DockerOrchestrationTemplateProviderFactory extends DefaultElementFactory {
    rolesAllowed        : Role[] = [new Role('admin'), new Role('tenant:user')];
    elementName         : string = 'Docker Swarm';
    displayIcon         : string = 'assets/icons/hal/orchestration/providers/docker-single.svg';
    paletteIcon         : string = 'assets/icons/hal/orchestration/providers/docker-swarm.svg';


    initialize(canvas: Canvas, element: HTMLElement): void {
        super.initialize(canvas, element);
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

    newElement(x: number,
               y: number,
               event: Event,
               canvas: Canvas,
               target: any): Drawable {
        return new DockerOrchestrationTemplateProviderElement(x, y);
    }


    protected createStyle(canvas: Canvas): void {
        let style = {};
        mxConstants.VERTEX_SELECTION_COLOR = 'none';
        style[mxConstants.STYLE_FILLCOLOR] = 'none';
        style[mxConstants.STYLE_STROKECOLOR] = 'none';

        canvas.getStylesheet()
            .putCellStyle(
                'docker-group-style',
                style
            );
        this.createDockerNodeStyle(canvas);
    }

    private createDockerNodeStyle(canvas: Canvas) {
        let style = {};
        style[mxConstants.STYLE_IMAGE] = this.displayIcon;
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.HexagonPerimeter;
        style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#000000';
        style[mxConstants.STYLE_LABEL_PADDING] = 8;
        style[mxConstants.STYLE_SPACING_TOP] = -64;
        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] =  mxConstants.ALIGN_BOTTOM;
        canvas.getStylesheet()
            .putCellStyle(
                'docker-node-style',
                style
            );
    }
}
