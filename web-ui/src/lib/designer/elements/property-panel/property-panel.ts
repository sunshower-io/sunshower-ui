import {bindable, customElement, containerless} from "aurelia-framework";

@containerless
@customElement('property-panel')
export class PropertyPanel {

    @bindable
    propertyPanel: HTMLElement;

    attached() {
        $(this.propertyPanel).find('.collapsible').collapsible();
    }


}