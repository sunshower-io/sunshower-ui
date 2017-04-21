
import {
    autoinject,
    containerless,
    customElement
} from "aurelia-framework";
import {
    Grid,
    Designer
} from 'lib/designer/core'

@autoinject
@containerless
@customElement('infrastructure-designer')
export default class InfrastructureDesigner {


    private designer            : Designer;
    private element             : HTMLElement;

    constructor() {


    }

    attached() : void {
        this.designer = new Designer(this.element);
        let grid = new Grid(this.designer.getCanvas());
        grid.draw();
    }




}