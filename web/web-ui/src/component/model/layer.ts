import {Element, AbstractElement} from "canvas/element/element";


import {Vertex} from "algorithms/graph/graph";
import {
    mxImage,
    mxConstants,
    mxCellOverlay
} from "mxgraph";
import {Kv} from "utils/objects";

type Properties = {[key: string]: any};
type PropertyNode = Vertex<Properties>;


export class CompositeElement extends AbstractElement {

    constructor(public readonly name: string,
                public readonly description: string,
                public readonly icon: string) {
        super();
        this.setLabel(name);
    }

    addElements(members: Element[]): void {
        for (let member of members) {
            let pmember = member as any as PropertyNode;
            this.addSuccessor(pmember);
            pmember.addPredecessor(this);
        }
    }

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

    constructor(name: string,
                description: string) {
        super(
            name,
            description,
            `assets/sui/themes/hasli/assets/images/layers.svg`
        );
    }


}


