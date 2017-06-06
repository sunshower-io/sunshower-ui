import {bindable, containerless, customElement} from "aurelia-framework";
import {Property, Entity} from "lib/designer/model/entity";

@customElement('property-row')
@containerless
export class PropertyRow {

    @bindable
    private property : Property;

    @bindable
    private entity : Entity;
}