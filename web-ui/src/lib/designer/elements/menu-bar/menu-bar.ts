import {customElement, bindable} from "aurelia-framework";
import {UUID} from 'lib/common/lang';

@customElement('menu-bar')
export class MenuBar {
    @bindable
    private controlId                       : string;

    constructor() {
        this.controlId = UUID.randomUUID().value;
    }

    attached() {
        $('.dropdown-button').dropdown();
    }

}