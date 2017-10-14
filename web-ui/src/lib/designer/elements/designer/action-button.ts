
import {
    child,
    bindable,
    customElement,
    autoinject,
    containerless,
    useShadowDOM
} from "aurelia-framework";

@containerless
@customElement("action-button")
export class DesignerActionButton {

    @bindable
    active: boolean;

    attached() {

        this.active = true;
    }

}
