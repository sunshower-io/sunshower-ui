import {bindable, customElement, containerless} from "aurelia-framework";
import {Entity, Property} from "lib/designer/model/entity";

@containerless
@customElement('property-panel')
export class PropertyPanel {

    @bindable
    propertyCollapsible: HTMLElement;

    entities: Entity[];

    attached() {
        let entityA = new Entity(),
            propertyA = new Property(),
            entityB = new Entity(),
            propertyB = new Property(),
            propertyB1 = new Property();
        entityA.title = "Test A";
        entityB.title = "Test B";
        propertyA.type = "text";
        propertyA.label = "Name";
        propertyB.type = "text";
        propertyB.label = "Name";
        propertyB1.type = "number";
        propertyB1.label = "Number of Workers";

        entityA.properties = [propertyA];
        entityB.properties = [propertyB, propertyB1];

        this.entities = [entityB, entityA];

        //todo re-call every time this updates
        $(this.propertyCollapsible).collapsible();
        // setTimeout(() => {
        //     Materialize.updateTextFields();
        // }, 100);
    }


}