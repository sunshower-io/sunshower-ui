import {
    customElement,
    bindable,
    autoinject
} from "aurelia-framework";
import {UUID} from 'lib/common/lang';
import {DesignerManager} from "lib/designer/core";

@customElement('menu-bar')
export class MenuBar {
    @bindable
    private controlId                       : string;

    @bindable
    private templateDD                      : HTMLElement;

    constructor(private manager:DesignerManager) {
        this.controlId = UUID.randomUUID().value;
    }

    attached() {
        $(this.templateDD).dropdown();
    }

    undo() : void {
        this.manager.undo();
    }

    redo() : void {
        this.manager.redo();
    }

}