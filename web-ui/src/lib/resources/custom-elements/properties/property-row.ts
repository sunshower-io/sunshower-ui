import {bindable, containerless, customElement} from "aurelia-framework";
import {Property, Entity} from "lib/designer/model/entity";
import {UUID} from "lib/common/lang/uuid";

@customElement('property-row')
@containerless
export class PropertyRow {

    @bindable
    private property : Property;

    private id       : string = UUID.random();

    activate() {
        setTimeout(() => {
            Materialize.updateTextFields();
        }, 100);
    }

}