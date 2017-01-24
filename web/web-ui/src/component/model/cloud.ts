

import {CompositeElement} from './layer';
import {
    AbstractElementFactory,
    Elements, ElementEditor,
} from "canvas/element/element";


import {EditorContext} from "canvas/core/canvas";

import {Registry} from "utils/registry";

import {
    mxGeometry,

} from "mxgraph";


import {
    FullVirtualCloudEditor
} from "component/editors/cloud/full";

import {Class} from "lang/class";

import {
    EditableElement,
} from "canvas/element/element";
import {BasicVirtualCloudEditor} from "component/editors/cloud/basic";


export class VirtualCloud extends
    CompositeElement
    implements
        EditableElement<VirtualCloud, ElementEditor<VirtualCloud>>
{


    static readonly editors: Map<string, ElementEditor<VirtualCloud>> = VirtualCloud.initialize();


    static initialize():Map<string, ElementEditor<VirtualCloud>> {
        let result = new Map<string, ElementEditor<VirtualCloud>>();
        result['basic'] = BasicVirtualCloudEditor;
        result['full'] =  FullVirtualCloudEditor;
        return result;
    }



    constructor() {
        super();
        this.setAncestor(true);
        this.setCollapsable(true);
        this.name = 'VPC 0';
        this.icon = 'assets/sui/themes/hasli/assets/images/icons/provider/generic/cloud.svg';
        this.geometry = new mxGeometry(0, 0, 100, 100);
    }

    getEditorOfRole(role: string): Class<ElementEditor<VirtualCloud>> {
        return VirtualCloud.editors[role];
    }

    hasEditorOfRole(role: string): boolean {
        return VirtualCloud.editors[role];
    }

    protected shallowCopy(): CompositeElement {
        let clone = new VirtualCloud();
        clone.name = this.name;
        clone.geometry = this.geometry.clone();
        return clone;
    }

    regroup() : void {
        this.host.refresh(this);
        let bb = this.host.getBoundingBox(this.children);
        if(bb) {
            let
                geometry = this.geometry,
                x = Math.min(bb.x, geometry.x),
                y = Math.min(bb.y, geometry.y),
                width = Math.max(bb.width, geometry.width + 64),
                height = Math.max(bb.height, geometry.height + 64);
            this.geometry = new mxGeometry(x, y, width, height);
        }
        this.host.refresh(this);
    }



}

export class CloudElementFactory extends AbstractElementFactory<VirtualCloud> {

    create(model: EditorContext, registry: Registry): VirtualCloud {
        let
            draftboardManager = registry.draftboardManager,
            layer = new VirtualCloud(),
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
