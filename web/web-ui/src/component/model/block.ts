import {CompositeElement, LayerElement} from './layer';
import {
    AbstractElementFactory,
    Elements
} from "canvas/element/element";



import {Vertex} from "algorithms/graph/graph";
import {
    mxGeometry,
} from "mxgraph";
import {EditorContext} from "canvas/core/canvas";

import {DraftboardManager} from "component/draftboard/draftboard";

type Properties = {[key: string]: any};
type PropertyNode = Vertex<Properties>;

export class BlockElement extends CompositeElement {

    constructor(name: string,
                description: string) {
        super(
            name,
            description,
            `assets/sui/themes/hasli/assets/images/cube.svg`
        );
    }
}

export class BlockElementFactory extends AbstractElementFactory<LayerElement> {


    create(model: EditorContext, draftboardManager: DraftboardManager): LayerElement {

        let layer = new BlockElement(
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
        return layer;
    }

}
