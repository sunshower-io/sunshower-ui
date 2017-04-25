import {Canvas} from "lib/designer/canvas/canvas";
import {Palette} from "lib/designer/canvas/palette";


import {
    containerless,
    customElement,
    bindable,
    autoinject
} from "aurelia-framework";
import {DesignerManager} from "../../core/designer-manager";


@autoinject
@customElement('element-panel')
export class ElementPanel {

    @bindable
    public active: boolean = true;


    constructor(private readonly designerManager: DesignerManager) {

    }


    attached() {
        console.log("DES", this.designerManager);
    }


}