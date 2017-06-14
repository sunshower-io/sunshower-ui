import {bindable, customElement, containerless} from "aurelia-framework";
import {Entity, Property} from "lib/designer/model/entity";
import {DesignerManager} from "lib/designer/core/designer-manager";
import {Vertex} from "../../model/graph/vertex";
import {RenderableVertex} from "../../model/elements";

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
            let mxcells = (t.data as any).cells;
            for (let i = 0; i < mxcells.length; i++ ) {
                let mxcell = (mxcells[i] as RenderableVertex);
                this.add_properties(mxcell);
            }

            //todo handle properties being directly on Vertex

            $(this.propertyCollapsible).collapsible();
            setTimeout(() => {
                Materialize.updateTextFields();
            }, 100);
        });

    }

    add_properties(mxcell: any) {
        if (mxcell.isVertex()) {
            console.log(mxcell.vertex);
            let entities = mxcell.vertex.entities;
            if (entities) {
                this.push_entities(entities);
            }
            if (mxcell.children) {
                this.push_children(mxcell);
            }
        }
    }

    push_entities(entities: Entity[]) {
        for (let j = 0; j < entities.length; j++) {
            this.entities.push(entities[j]);
        }
    }

    push_children(cell: any) {
        if (cell.isVertex && cell.children) {
            for (let i = 0; i < cell.children.length; i++) {
                let mxcell = (cell.children[i] as any);
                this.add_properties(mxcell);
            }
        }
    }


}