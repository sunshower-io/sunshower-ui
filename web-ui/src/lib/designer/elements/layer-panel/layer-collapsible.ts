import {LayerNode} from "./layer-panel";
import {bindable, containerless, customElement} from "aurelia-framework";
import {createEvent} from "lib/common/dom";

@customElement('layer-collapsible')
@containerless
export class LayerCollapsible {

    @bindable
    private nodes : LayerNode[];

    @bindable
    private holder : HTMLElement;

    constructor() {

    }

    attached() {
        $(this.holder).find('.collapsible').collapsible();
    }

    
    select(node: LayerNode, event: Event) {
        let target = event.target,
            createdEvent = createEvent('layerselected', node.self);
        target.dispatchEvent(createdEvent);
    }


}