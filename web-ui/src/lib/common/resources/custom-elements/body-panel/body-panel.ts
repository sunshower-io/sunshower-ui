import {customElement, bindable} from "aurelia-framework";

@customElement('body-panel')
export class BodyPanel {

    @bindable
    sections: boolean;

    @bindable
    active: boolean;

    @bindable
    content: HTMLElement;

    @bindable
    button: HTMLElement;

    activate(active, sections, content, button) {

    }

    togglePanel() : void {
        this.active = !this.active;
        $(this.content).toggleClass('body-content-partial');
        if (this.button) {
            $(this.button).toggleClass('body-panel-open');
        }
    }


}