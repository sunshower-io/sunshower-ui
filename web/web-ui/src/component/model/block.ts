import {CompositeElement, LayerElement} from './layer';
import {
    AbstractElementFactory,
    Elements, BlockMember,
    Element
} from "canvas/element/element";


import {Vertex} from "algorithms/graph/graph";
import {
    mxGeometry,
} from "mxgraph";
import {EditorContext} from "canvas/core/canvas";

import {Registry} from "utils/registry";

type Properties = {[key: string]: any};

export class BlockElement extends CompositeElement {

    constructor() {
        super();
        this.icon = `assets/sui/themes/hasli/assets/images/cube.svg`;
        this.geometry = new mxGeometry();
    }


    protected shallowCopy(): CompositeElement {
        let copy = new BlockElement();
        copy.name = this.name;
        return copy;
    }
}

export class BlockElementFactory extends AbstractElementFactory<BlockElement> {


    create(model: EditorContext, registry: Registry): BlockElement {

        let
            blockManager = registry.blockManager,
            draftboardManager = registry.draftboardManager,
            layer = new BlockElement(),
            canvas = model.graph,
            selected = Elements.pluckLayers(canvas.getSelectionCells()),
            roots = Elements.resolveRoots(selected);

        layer.name = this.getProperty('name');
        layer.description = this.getProperty('description');
        draftboardManager
            .removeAll(roots);

        layer.addElements(roots);
        blockManager.add(layer);
        draftboardManager.add(layer);

        try {
            canvas.getModel().beginUpdate();

            let boundingBox = canvas.view.getBounds(roots);
            let geometry = new mxGeometry(
                boundingBox.x - 48,
                boundingBox.y - 48,
                boundingBox.width + 96,
                boundingBox.height + 96
            );
            layer.geometry = geometry;
            layer.addTo(model.graph, canvas.getDefaultParent(), false);
        } finally {
            canvas.getModel().endUpdate();
        }

        blockManager.add(layer);
        return layer;
    }
}
