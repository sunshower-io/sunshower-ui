import {CompositeElement} from './layer';


import {
    Elements,
    AbstractElementFactory
} from "common/lib/canvas/element";


import {
    mxGeometry,
} from "mxgraph";
import {EditorContext} from "common/lib/canvas";

import {Registry} from "common/lib/utils";
import {BlockManager} from "apps/workspaces/services/blocks/block";
import {DraftboardManager} from "apps/workspaces/services/draftboard/draftboard";

type Properties = {[key: string]: any};
export enum BlockType {
    Official,

    Custom
}

export class BlockElement extends CompositeElement {

    type: BlockType;

    categories : string[];

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
            blockManager = registry.get(BlockManager) as BlockManager,
            draftboardManager = registry.get(DraftboardManager) as DraftboardManager,
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
            layer.geometry = this.getGeometry(canvas, roots);
            layer.addTo(model.graph, canvas.getDefaultParent(), false);
            canvas.groupCells(layer, 24, roots);
        } finally {
            canvas.getModel().endUpdate();
        }

        blockManager.add(layer);
        return layer;
    }
}
