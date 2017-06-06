import {bindable, customElement, containerless} from "aurelia-framework";
import {Entity, Property} from "lib/designer/model/entity";
import {DesignerManager} from "lib/designer/core/designer-manager";

@containerless
@customElement('property-panel')
export class PropertyPanel {

    @bindable
    propertyCollapsible: HTMLElement;

    entities: Entity[];

    constructor(private readonly designerManager: DesignerManager) {

    }

    attached() {
        this.entities = [];

        this.designerManager.getCurrentCanvas().listen('selection-changed').forEach(t => {
            this.entities = [];

            console.log((t.data as any).cells);

            $(this.propertyCollapsible).collapsible();
            setTimeout(() => {
                Materialize.updateTextFields();
            }, 100);
        });

        // let entityA = new Entity(),
        //     propertyA = new Property(),
        //     entityB = new Entity(),
        //     propertyB = new Property(),
        //     propertyB1 = new Property();
        // entityA.title = "Test A";
        // entityB.title = "Test B";
        // propertyA.type = "text";
        // propertyA.label = "Name";
        // propertyB.type = "text";
        // propertyB.label = "Name";
        // propertyB1.type = "number";
        // propertyB1.label = "Number of Workers";
        //
        // entityA.properties = [propertyA];
        // entityB.properties = [propertyB, propertyB1];
        //
        // this.entities = [entityA, entityB];
    }


}