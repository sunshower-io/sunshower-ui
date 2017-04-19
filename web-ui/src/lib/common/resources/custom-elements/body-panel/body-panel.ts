import {customElement, bindable} from "aurelia-framework";

@customElement('body-panel')
export class BodyPanel {

    @bindable
    sections: boolean;


}