
import {CompositeElement} from './layer';
import {
    AbstractElementFactory,
    Elements, EditableElement,
} from "canvas/element/element";


import {
    mxGeometry,
} from "mxgraph";
import {EditorContext} from "canvas/core/canvas";

import {Registry} from "utils/registry";
import {SecurityGroupEditor} from "component/editors/security-group/security-group";
import {Class} from "lang/class";
export class SecurityGroupElement extends CompositeElement
    implements
        EditableElement<
            SecurityGroupElement,
            SecurityGroupEditor
        >
{
    editor: Class<SecurityGroupEditor> = SecurityGroupEditor;

    constructor() {
        super();
        this.icon = 'assets/sui/themes/hasli/assets/images/shield.svg';
    }


    protected shallowCopy(): CompositeElement {
        let clone = new SecurityGroupElement();
        clone.geometry = this.geometry.clone();
        return clone;
    }

}
export class SecurityGroupElementFactory extends AbstractElementFactory<SecurityGroupElement> {

    create(model: EditorContext, registry: Registry): SecurityGroupElement {
        let
            draftboardManager = registry.draftboardManager,
            layer = new SecurityGroupElement(),
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
        } finally {
            canvas.getModel().endUpdate();
        }
        return layer;
    }
}
