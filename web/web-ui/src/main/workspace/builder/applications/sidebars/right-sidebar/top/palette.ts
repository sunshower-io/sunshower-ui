
import {createEvent} from "utils/events";
import {
    GraphProcessor,
    GraphContext
} from "main/workspace/builder/abstract-graph";
import {mxConstants} from "mxgraph";
import {Kv} from "utils/objects";
import {
    mxCellOverlay,
    mxImage
} from "mxgraph";




import 'pnotify';

export class Palette {

    element:HTMLElement;

    attached() : void {


    }

    groupElements() :void {
        let event = createEvent(
            'palette-event',
            new GroupElementsProcessor()
        );
        this.element.dispatchEvent(event);
    }
}

class GroupElementsProcessor implements GraphProcessor {

    protected createStyle(): string {
        return Kv.create(';')
            .pair('shape', 'label')
            .pair('imageWidth', 24)
            .pair('imageHeight', 24)
            .pair('fillOpacity', 0)
            .pair('verticalAlign', 'bottom')
            .pair('spacingBottom', '40')
            .pair('fontColor', '#000000')
            .pair('fontStyle', mxConstants.FONT_BOLD)
            .toString();
    }

    apply(context: GraphContext): void {
        let selected = context.graph.getSelectionCells(),
            parent = context.graph.insertVertex(
                context.graph.getDefaultParent(),
                null, null, 400, 400, 400, 400,
                this.createStyle()
            ),
            parentImage =
                new mxImage(
                    'assets/sui/themes/hasli/assets/images/icons/provider/generic/cloud.svg',
                    30, 20
                ),
            cloudOverlay = new mxCellOverlay(
                parentImage,
                null,
                mxConstants.ALIGN_LEFT,
                mxConstants.ALIGN_TOP
            );
        context.graph.addCellOverlay(parent, cloudOverlay);

        context.graph.groupCells(parent, 24, selected);




    }
}
