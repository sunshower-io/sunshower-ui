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

import {
    Role
} from "lib/common/security/model/user";
import {mxCell} from "mxgraph";
import {kubernetesInitialLayout, KubernetesMasterElementLoader} from "./kubernetes-nodes";

export class KubernetesOrchestrationTemplateProviderElement extends Vertex {
    labelVisible = false;
    style: string = 'kubernetes-group-style';

    constructor(label: string, x: number, y: number) {
        super(label, x, y, 380, 100);
    }

    addTo(canvas: Canvas): boolean {
        let a = super.addTo(canvas);
        return a;
    }

    protected doInsert(canvas: Canvas): void {
    canvas.addCell(this, null);
    let edge = new mxCell(),
        master = this.children[0],
        node = this.children[1];

    let e = canvas.insertEdge(this, '', '', node, master, 'strokeColor=#0087c9;dashed=1;strokeWidth=2');
    e.setEdge(true);
    }

}

export class KubernetesOrchestrationTemplateProviderFactory extends DefaultElementFactory {
    rolesAllowed        : Role[] = [new Role('admin')];
    elementName         : string = 'Kubernetes';
    displayIcon         : string = 'assets/icons/hal/orchestration/providers/kubernetes-single.svg';
    paletteIcon         : string = 'assets/icons/hal/orchestration/providers/kubernetes-swarm.svg';




    initialize(canvas: Canvas, element: HTMLElement): void {
        super.initialize(canvas, element);
        this.createStyle(canvas);
        canvas.registerProvider(this);
    }

    handles(key: string): boolean {
        return true;
    }

    resolveElementLoader(key: string): ElementLoader {
        return new KubernetesMasterElementLoader();
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

    newElement(
        x: number,
        y: number,
        event: Event,
        canvas: Canvas,
        target: any
    ): Drawable {
        return kubernetesInitialLayout(x, y);
    }


    protected createStyle(canvas: Canvas): void {
        let style = {};
        mxConstants.VERTEX_SELECTION_COLOR = 'none';
        style[mxConstants.VERTEX_SELECTION_COLOR] = 'none';
        style[mxConstants.STYLE_FILLCOLOR] = 'none';
        style[mxConstants.STYLE_STROKECOLOR] = 'none';

        canvas.getStylesheet()
            .putCellStyle(
                'kubernetes-group-style',
                style
            );
        this.createKubernetesNodeStyle(canvas);
    }

    private createKubernetesNodeStyle(canvas: Canvas) {
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
                'kubernetes-node-style',
                style
            );
    }
}
