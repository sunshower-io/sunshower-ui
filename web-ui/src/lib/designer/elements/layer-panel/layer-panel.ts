import {containerless, customElement} from "aurelia-framework";

@containerless
@customElement('layer-panel')
export class LayerPanel {

    attached() {
        $('.collapsible').collapsible();
    }
}