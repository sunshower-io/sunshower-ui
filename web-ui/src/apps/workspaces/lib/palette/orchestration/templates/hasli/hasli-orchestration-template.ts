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
import {hasliInitialLayout, HasliInitiatorElementLoader} from "./hasli-nodes";
import {mxCell} from "mxgraph";

export class HasliOrchestrationTemplateProviderElement extends Vertex {
    labelVisible = false;
    style: string = 'hasli-group-style';

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
            initiator = this.children[0],
            agent = this.children[1];

        let e = canvas.insertEdge(this, '', '', agent, initiator, 'strokeColor=#0087c9;dashed=1;strokeWidth=2');
        e.setEdge(true);

        let e2 = canvas.insertEdge(this, '', '', initiator, agent, 'strokeColor=#0087c9;dashed=1;strokeWidth=2');
    }


}

export class HasliOrchestrationTemplateProviderFactory extends DefaultElementFactory {
    elementName         : string = 'Hasli';
    rolesAllowed        : Role[] = [new Role('admin')];
    displayIcon         : string = 'assets/icons/hal/orchestration/providers/hasli-single.svg';
    paletteIcon         : string = 'assets/icons/hal/orchestration/providers/hasli-swarm.svg';




    initialize(canvas: Canvas, element: HTMLElement): void {
        super.initialize(canvas, element);
        this.createStyle(canvas);
        canvas.registerProvider(this);
    }

    handles(key: string): boolean {
        return true;
    }

    resolveElementLoader(key: string): ElementLoader {
        return new HasliInitiatorElementLoader();
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
        return hasliInitialLayout(x, y);
    }


    protected createStyle(canvas: Canvas): void {
        let style = {};
        mxConstants.VERTEX_SELECTION_COLOR = 'none';
        style[mxConstants.VERTEX_SELECTION_COLOR] = 'none';
        style[mxConstants.STYLE_FILLCOLOR] = 'none';
        style[mxConstants.STYLE_STROKECOLOR] = 'none';

        canvas.getStylesheet()
            .putCellStyle(
                'hasli-group-style',
                style
            );
        this.createHasliNodeStyle(canvas);
    }

    private createHasliNodeStyle(canvas: Canvas) {
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
                'hasli-node-style',
                style
            );
    }
}

