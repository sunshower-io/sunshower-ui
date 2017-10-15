
import {
    child,
    bindable,
    customElement,
    autoinject,
    containerless,
    useShadowDOM
} from "aurelia-framework";
import {Router} from "aurelia-router";

@containerless
@customElement("action-button")
export class DesignerActionButton {

    @bindable
    active: boolean = true;

    constructor(private router: Router) {
    }

    deploy() : void {
        this.router.navigate('deployment');
    }

}
