import {
    mxCellOverlay,
    mxConstants,
    mxImage,
} from 'mxgraph';


import {Kv} from "utils/objects";
import {AbstractElement} from "canvas/element/element";

export class InfrastructureElement extends AbstractElement {


    constructor() {
        super();
        this.setAttribute('named', '1');
    }

    protected createOverlay(): mxCellOverlay {

        let
            url = this.icon,
            image = new mxImage(url, 64, 64),
            iconOverlay = new mxCellOverlay(
                image,
                null,
                mxConstants.ALIGN_CENTER,
                mxConstants.ALIGN_MIDDLE,
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
            .pair('imageWidth', 64)
            .pair('imageHeight', 64)
            .pair('fillOpacity', 0)
            .pair('strokeOpacity', 0)
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