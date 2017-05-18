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

export class DockerOrchestrationTemplateProviderElement extends Vertex {
    style: string = 'hal-docker-orchestration-template-provider-style';

    constructor(x: number, y: number) {
        super('Docker', x, y, 600, 100);
        this.addChild(new DockerManagerNode('manager', 10, 30, 40, 40));
        this.addChild(new DockerWorkerNode('worker', 500, 30, 40, 40));
    }
}

export class DockerOrchestrationTemplateProviderFactory extends DefaultElementFactory {
    rolesAllowed        : Role[] = [new Role('admin'), new Role('tenant:user')];
    elementName         : string = 'Docker Swarm';
    displayIcon         : string = 'assets/icons/hal/orchestration/providers/docker-single.svg';
    paletteIcon         : string = 'assets/icons/hal/orchestration/providers/docker-expanded.svg';
    // displayIcon         : string = 'assets/icons/hal/orchestration/providers/docker-single.svg';


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
        style[mxConstants.STYLE_FONTCOLOR] = '#ff0000';
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        canvas.getStylesheet()
            .putCellStyle(
                'hal-docker-orchestration-template-provider-style',
                style
            );
        this.createDockerNodeStyle(canvas);
    }

    private createDockerNodeStyle(canvas: Canvas) {
        let style = {};
        style[mxConstants.STYLE_FONTCOLOR] = '#ff0000';
        style[mxConstants.STYLE_IMAGE] = this.displayIcon;
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.HexagonPerimeter;
        canvas.getStylesheet()
            .putCellStyle(
                'docker-node-style',
                style
            );
    }
}
