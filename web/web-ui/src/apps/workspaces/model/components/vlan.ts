
import {CompositeElement} from './layer';
import {
    AbstractElementFactory,
    Elements,
} from "common/lib/canvas/element";


import {Registry} from "common/lib/utils";
import {EditorContext} from "common/lib/canvas";
import {DraftboardManager} from "apps/workspaces/services/draftboard/draftboard";



export class VlanElement extends CompositeElement {

    constructor() {
        super();
        this.icon = `assets/sui/themes/hasli/assets/images/icons/provider/generic/vlan.svg`
    }

    protected shallowCopy(): CompositeElement {
        let copy = new VlanElement();
        copy.geometry = this.geometry.clone();
        return copy;
    }


}


export class VlanElementFactory extends AbstractElementFactory<VlanElement> {

    create(model: EditorContext, registry: Registry): VlanElement {
        let
            draftboardManager = registry.get(DraftboardManager) as DraftboardManager,
            layer = new VlanElement(),
            canvas = model.graph,
            selected = Elements.pluckLayers(canvas.getSelectionCells()),
            roots = Elements.resolveRoots(selected);

        layer.name = this.getProperty('name');
        layer.description = this.getProperty('description');
        draftboardManager
            .removeAll(roots);

        layer.addElements(roots);
        draftboardManager.add(layer);

        try {
            canvas.getModel().beginUpdate();
            layer.geometry = this.getGeometry(canvas, roots);
            layer.addTo(model.graph, canvas.getDefaultParent(), false);
            canvas.groupCells(layer, 24, roots);
        } finally {
            canvas.getModel().endUpdate();
        }
        return layer;
    }
}
