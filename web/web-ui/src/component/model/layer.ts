import {
    Element,
    Elements,
    AbstractElement,
    AbstractElementFactory,
} from "canvas/element/element";


import {Vertex} from "algorithms/graph/graph";
import {
    mxImage,
    mxConstants,
    mxGeometry,
    mxCellOverlay
} from "mxgraph";
import {Kv} from "utils/objects";
import {Copyable} from "lang/class";
import {Registry} from "utils/registry";
import {EditorContext} from "canvas/core/canvas";

type Properties = {[key: string]: any};
type PropertyNode = Vertex<Properties>;

interface pt {
    x:number;
    y:number;
}

export abstract class CompositeElement extends AbstractElement {

    public name: string;
    public description: string;
    public icon: string;

    constructor() {
        super();
        this.setLabel(name);
        this.setCollapsable(true);
        this.setAttribute('named', '1');
    }

    addElement(element: Element): void {
        let pmember = element as any as PropertyNode;
        this.addSuccessor(pmember);
        pmember.addPredecessor(this);
    }

    addElements(members: Element[]): void {
        for (let member of members) {
            this.addElement(member);
        }
    }

    protected computePosition() : mxGeometry {
        let predecessors = this.getPredecessors(),
            tgeo = this.geometry.clone();

        if(predecessors && predecessors.length > 0) {
            let predecessor = predecessors[0],
                geo = predecessor.geometry;
            tgeo.x -= geo.x;
            tgeo.y -= geo.y;
        }
        return tgeo;
    }

    copy(): CompositeElement {
        let copy = this.shallowCopy(),
            geometry = this.computePosition();
        copy.geometry = geometry;
        for(let child of this.getChildren()) {
            let ccopy = child as any as Element;
            copy.addElement(ccopy.copy());
        }
        return copy;
    }

    protected abstract shallowCopy(): CompositeElement;



    protected createOverlay(): mxCellOverlay {

        let
            url = this.icon,
            image = new mxImage(url, 24, 24),
            iconOverlay = new mxCellOverlay(
                image,
                null,
                mxConstants.ALIGN_LEFT,
                mxConstants.ALIGN_TOP,
                null,
                'default'
            );
        return iconOverlay;
    }


    protected createOverlays(): mxCellOverlay[] {
        return [this.createOverlay()];
    }


    protected createCss(): Kv {
        return Kv.create(';')
            .pair('spacingBottom', -100)
            .pair('indicatorStrokeColor', '#ff0000')
            .pair('shape', 'label')
            .pair('imageWidth', 24)
            .pair('imageHeight', 24)
            .pair('fillOpacity', 0)
            .pair('strokeColor', '#B8B8B8')
            .pair('verticalAlign', 'bottom')
            .pair('spacingBottom', '24')
            .pair('verticalLabelPosition', mxConstants.ALIGN_TOP)
            .pair('labelPosition', mxConstants.ALIGN_MIDDLE)
            .pair('fontColor', '#A2A2A2')
            .pair(mxConstants.LINE_HEIGHT, 0.6)
            .pair('fontStyle', mxConstants.FONT_BOLD)
    }

}

export class LayerElement extends CompositeElement {

    constructor() {
        super();
        this.icon = `assets/sui/themes/hasli/assets/images/layers.svg`
    }

    protected shallowCopy(): CompositeElement {
        let copy = new LayerElement();
        copy.name = this.name;
        return copy;
    }
}


export class LayerElementFactory extends AbstractElementFactory<LayerElement> {


    create(model: EditorContext, registry: Registry): LayerElement {

        let
            draftboardManager = registry.draftboardManager,
            layer = new LayerElement(),
            canvas = model.graph,
            selected = Elements.pluckLayers(canvas.getSelectionCells()),
            roots = Elements.resolveRoots(selected);


        layer.name = this.getProperty('name');
        layer.description = this.getProperty('description');
        draftboardManager
            .removeAll(roots);

        layer.addElements(roots);
        draftboardManager.add(layer);

        try {
            canvas.getModel().beginUpdate();
            layer.geometry = this.getGeometry(canvas, roots);
            layer.addTo(canvas, canvas.getDefaultParent(), false);
        } finally {
            canvas.getModel().endUpdate();
        }
        return layer;
    }

}
