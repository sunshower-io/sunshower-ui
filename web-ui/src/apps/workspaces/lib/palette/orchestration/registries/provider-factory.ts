import {ElementFactoryProvider, ElementFactory, DefaultElementFactory} from "lib/designer/canvas/palette";
import {Role} from "lib/common/security/model/user";
import {Canvas} from "lib/designer/canvas/canvas";
import {
    Drawable,
    RenderableVertex as Vertex
} from 'lib/designer/model';
import {
    mxPerimeter,
    mxConstants, mxEdge, mxCell
} from "mxgraph";

export class RegistryProviderFactory implements ElementFactoryProvider {
    icon : string = 'mdi-apps';

    load() : Promise<ElementFactory[]> {
        return Promise.resolve([

        ]);
    }
}

export class RegistryElementFactory extends DefaultElementFactory {
    rolesAllowed: Role[] = [new Role('admin'), new Role('tenant:user')];
    elementName: string;
    displayIcon: string = 'assets/icons/designer/docker-service.svg';
    paletteIcon: string = 'assets/icons/designer/docker-service.svg';

    constructor(elementName: string, icon?: string) {
        super();
        this.elementName = elementName;
        if (icon) {
            this.displayIcon = icon;
            this.paletteIcon = icon;
        }
    }

    initialize(canvas: Canvas, element: HTMLElement): void {
        super.initialize(canvas, element);
        this.createStyle(canvas);
    }

    newElement(x: number, y: number, event: Event, canvas: Canvas, target: any): Drawable {
        return new RegistryElement(this.elementName, x, y);
    }

    protected createStyle(canvas: Canvas) : void {
        let style = {};
        style[mxConstants.VERTEX_SELECTION_COLOR] = 'none';
        style[mxConstants.STYLE_FILLCOLOR] = 'none';
        style[mxConstants.STYLE_STROKECOLOR] = 'none';
        style[mxConstants.STYLE_IMAGE] = this.displayIcon;
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.HexagonPerimeter;
        style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#000000';
        style[mxConstants.STYLE_LABEL_PADDING] = 8;
        style[mxConstants.STYLE_SPACING_TOP] = -50;
        style[mxConstants.STYLE_PERIMETER_SPACING] = 8;
        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;

        canvas.getStylesheet()
            .putCellStyle(
                'registry-service-style',
                style
            );
    }

}

export class RegistryElement extends Vertex {
    labelVisible = true;

    style: string = "registry-service-style";

    constructor(label: string, x: number, y: number) {
        super(label, x, y, 70, 70);
    }

    addTo(canvas: Canvas): boolean {
        let a = super.addTo(canvas);
        return a;
    }

    protected doInsert(canvas: Canvas): void {
        canvas.addCell(this, null);
        // let edge = new mxCell(),
        //     manager = this.children[0],
        //     worker = this.children[1];
        // canvas.insertEdge(this, 'frap', 'fap', worker, manager, 'strokeColor=#1EC38A;dashed=1;strokeWidth=2');
        //todo add edge between it and a worker
    }

}