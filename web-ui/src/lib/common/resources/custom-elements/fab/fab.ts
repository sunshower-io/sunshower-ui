import {customElement, bindable} from "aurelia-framework";

@customElement('fab')
export class Fab {

    @bindable
    active      : boolean;

}