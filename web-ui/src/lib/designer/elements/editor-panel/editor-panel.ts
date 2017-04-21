import {customElement, bindable} from "aurelia-framework";


@customElement('editor-panel')
export class EditorPanel {

    @bindable
    active: boolean;


    activate(active) {
        this.active = active;
    }

    togglePanel() : void {
        this.active = !this.active;
    }

}