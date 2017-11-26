import {bindable, customElement, containerless} from "aurelia-framework";
import {PropertyAwareObject} from "lib/designer/model/graph/vertex";

@containerless
@customElement('property-panel')
export class PropertyPanel {

    @bindable
    private object : PropertyAwareObject;

    activate(object:PropertyAwareObject) {
        this.object = object;
        console.log('this.object', this.object);
    }

}