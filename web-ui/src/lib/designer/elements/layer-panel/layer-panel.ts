import {containerless, customElement} from "aurelia-framework";

@containerless
@customElement('layer-panel')
export class LayerPanel {

    layerPanelCollapsible: HTMLElement;

    attached() {
        $(this.layerPanelCollapsible).find('.collapsible').collapsible();
    }
}