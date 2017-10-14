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
    mxConstants, mxEdge, mxCell
} from "mxgraph";
import {
    dockerInitialLayout,
    DockerManagerElementLoader
} from "./docker-nodes";

import {Role} from "lib/common/security/model/user";

// mxConstants.VERTEX_SELECTION_COLOR = 'none';
// mxConstants.HANDLE_FILLCOLOR = 'none';
// mxConstants.HANDLE_STROKECOLOR = 'none';



export class DockerOrchestrationTemplateProviderFactory extends DefaultElementFactory {
    rolesAllowed: Role[] = [new Role('admin'), new Role('tenant:user')];
    elementName: string = 'Docker Swarm';
    displayIcon: string = 'assets/icons/hal/orchestration/providers/docker-single.svg';
    paletteIcon: string = 'assets/icons/hal/orchestration/providers/docker-swarm.svg';


    initialize(canvas: Canvas, element: HTMLElement): void {
        super.initialize(canvas, element);
        this.createStyle(canvas);
        canvas.registerProvider(this);
    }


    isHostableBy(e: Drawable): boolean {
        return false;
    }

    handles(key: string): boolean {
        return DockerManagerElementLoader.types[key];
    }

    resolveElementLoader(key: string): ElementLoader {
        return new DockerManagerElementLoader();
    }

    newElement(x: number,
               y: number,
               event: Event,
               canvas: Canvas,
               target: any
    ): Drawable {
        return dockerInitialLayout(x, y);
    }


    protected createStyle(canvas: Canvas): void {
        let style = {};
        mxConstants.VERTEX_SELECTION_COLOR = 'none';
        style[mxConstants.VERTEX_SELECTION_COLOR] = 'none';
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
        style[mxConstants.STYLE_SPACING_TOP] = -30;
        style[mxConstants.STYLE_PERIMETER_SPACING] = 8;
        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
        canvas.getStylesheet()
            .putCellStyle(
                'docker-node-style',
                style
            );
    }
}
