import {customElement, bindable} from "aurelia-framework";

@customElement('body-panel')
export class BodyPanel {

    @bindable
    sections: boolean;

    @bindable
    active: boolean;

    @bindable
    content: HTMLElement;

    activate(active, sections, content) {

    }


    togglePanel() : void {
        this.active = !this.active;
        $(this.content).toggleClass('body-content-partial');
    }


}