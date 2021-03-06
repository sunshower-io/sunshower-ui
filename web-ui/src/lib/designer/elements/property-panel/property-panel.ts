import {bindable, customElement, containerless} from "aurelia-framework";
import {Entity, Property} from "lib/designer/model/entity";
import {DesignerManager} from "lib/designer/core/designer-manager";
import {Vertex} from "../../model/graph/vertex";
import {RenderableVertex} from "../../model/elements";
import {UUID} from "lib/common/lang/uuid";

@containerless
@customElement('property-panel')
export class PropertyPanel {

    @bindable
    propertyCollapsible: HTMLElement;

    id = UUID.random();
    cells           : Vertex[];

    cellName        : HTMLInputElement;
    renderables     : RenderableVertex[];

    constructor(private readonly designerManager: DesignerManager) {

    }

    updateName(): void {
        let cells = this.cells;
        if(cells && cells.length) {
            let cell = cells[0],
                renderable = this.renderables[0],
                name = this.cellName.value;
            cell.name = name;
            renderable.setValue(name);
        }
        

    }

    attached() {
        this.cells = [];

        this.designerManager.getCurrentCanvas().listen('selection-changed').forEach(t => {

            this.cells = [];
            this.renderables = [];
            let mxcells = (t.data as any).cells;
            for (let i = 0; i < mxcells.length; i++) {
                let mxcell = (mxcells[i] as RenderableVertex);
                this.add_cell(mxcell);
                this.renderables.push(mxcell);
            }

            setTimeout(() => {
                $(this.propertyCollapsible).find('.collapsible').collapsible();
                Materialize.updateTextFields();
            }, 100);
        });

    }

    add_cell(mxcell: RenderableVertex) {
        if (mxcell.isVertex()) {
            let vertex = mxcell.vertex;
            if ((vertex.entities && vertex.entities.length) || (vertex.properties && vertex.properties.length)) {
                this.cells.push(mxcell.vertex);
            }
            if (mxcell.children) {
                for (let i = 0; i < mxcell.children.length; i++) {
                    let cell = (mxcell.children[i] as RenderableVertex);
                    this.add_cell(cell);
                }
            }
        }
    }

}