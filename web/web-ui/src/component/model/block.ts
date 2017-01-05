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
import {EditorContext, Canvas} from "canvas/core/canvas";

import {Copyable} from "lang/class";
import {Registry} from "utils/registry";
import {Layer} from "mxgraph";

type Properties = {[key: string]: any};

export class BlockElement extends CompositeElement implements
    Copyable<BlockElement>,
    BlockMember<BlockElement>
{

    constructor(name: string,
                description: string) {
        super(
            name,
            description,
            `assets/sui/themes/hasli/assets/images/cube.svg`
        );
        this.geometry = new mxGeometry();
    }

    copyInto(canvas: Canvas, parent:Layer, x:number, y:number): BlockElement {
        let clone = new BlockElement(
            "clone of " + this.name,
            "clone of " + this.description
        );
        clone.host = this.host;
        clone.parent = parent;
        clone.geometry = this.geometry.clone();
        clone.geometry.x = x;
        clone.geometry.y = y;

        for(let child of this.getChildren()) {
            if((child as any).copyInto) {
                let cchild = (child as any as BlockElement).copyInto(canvas, clone, x, y);
                cchild.addPredecessor(clone);
                clone.addSuccessor(cchild);
            }
        }
        clone.addTo(canvas);
        return clone;
    }

    copy(): BlockElement {
        let clone = new BlockElement(
            "clone of " + this.name,
            "clone of " + this.description
        );
        clone.host = this.host;
        clone.geometry = this.geometry.clone();
        for(let child of this.getChildren()) {
            if((child as any).copy) {
                let clonable = child as any as Copyable<any>;
                this.addElements(clonable.copy());
            }
        }
        return clone;
    }
}

export class BlockElementFactory extends AbstractElementFactory<BlockElement> {


    create(model: EditorContext, registry:Registry): BlockElement {

        let
            blockManager = registry.blockManager,
            draftboardManager = registry.draftboardManager,
            layer = new BlockElement(
                this.getProperty('name'),
                this.getProperty('description')
            ),
            canvas = model.graph,
            selected = Elements.pluckLayers(canvas.getSelectionCells()),
            roots = Elements.resolveRoots(selected);

        draftboardManager
            .removeAll(roots);

        layer.addElements(roots);
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
            layer.addTo(canvas);
        } finally {
            canvas.getModel().endUpdate();
        }

        blockManager.add(layer);
        return layer;
    }

}
