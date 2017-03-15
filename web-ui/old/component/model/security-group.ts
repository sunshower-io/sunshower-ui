
import {CompositeElement} from './layer';
import {
    AbstractElementFactory,
    Elements, EditableElement, ElementEditor
} from "canvas/element/element";


import {
    mxGeometry,
} from "mxgraph";
import {EditorContext} from "canvas/core/canvas";

import {Registry} from "utils/registry";
import {FullSecurityGroupEditor} from "component/editors/security-group/full";
import {BasicSecurityGroupEditor} from "component/editors/security-group/basic";
import {Class} from "lang/class";
export class SecurityGroupElement extends CompositeElement
    implements
        EditableElement<
            SecurityGroupElement,
            ElementEditor<SecurityGroupElement>
        >
{

    static readonly editors: Map<string, ElementEditor<SecurityGroupElement>> = SecurityGroupElement.initialize();


    static initialize():Map<string, ElementEditor<SecurityGroupElement>> {
        let result = new Map<string, ElementEditor<SecurityGroupElement>>();
        result['basic'] = BasicSecurityGroupEditor;
        result['full'] =  FullSecurityGroupEditor;
        return result;
    }


    constructor() {
        super();
        this.icon = 'assets/sui/themes/hasli/assets/images/shield.svg';
    }

    getEditorOfRole(role: string): Class<ElementEditor<SecurityGroupElement>> {
        return SecurityGroupElement.editors[role];
    }

    hasEditorOfRole(role: string): boolean {
        return SecurityGroupElement.editors[role];
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
            canvas.groupCells(layer, 24, roots);
        } finally {
            canvas.getModel().endUpdate();
        }
        return layer;
    }
}
