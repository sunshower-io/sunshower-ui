import {mxCell} from 'mxgraph';
// import {Layer} from 'elements/layer';
import {Element} from 'canvas/element/element';
import {inject} from 'aurelia-framework';
import {Group} from "canvas/scene-graph/scene-graph";
import {Canvas, EditorContext} from "canvas/core/canvas";
import {DraftboardManager} from 'component/draftboard/draftboard';
import {Layer} from "mxgraph";
import {LayerElement} from "component/model/layer";
import {mxGeometry} from "mxgraph";


@inject(DraftboardManager)
export class LayerService {
    constructor(private draftboardManager: DraftboardManager) {

    }

    create(name: string,
           description: string,
           model: EditorContext): LayerElement {

        let layer = new LayerElement(
            name,
            description,
            ),
            canvas = model.graph,
            selected = this.pluckLayers(canvas.getSelectionCells()),
            roots = this.resolveRoots(selected);
        this.draftboardManager
            .removeAll(roots);

        console.log("ROOTS", roots);


        layer.addElements(roots);
        this.draftboardManager.add(layer);

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

    pluckLayers(cells: Layer[]): Element[] {
        let results = [];
        for (let cell of cells) {
            if (cell.getAttribute('element')) {
                results.push(cell as Element);
            }
        }
        return results;
    }

    aggregate(selection: Layer[]): {[key: string]: Element} {
        let result = {};
        for (let select of selection) {
            result[select.id] = selection;
        }
        return result;
    }


    resolveRoots(cells: Layer[]): Element[] {
        let results = [],
            duplicates = {},
            selected = this.aggregate(cells);
        for (let cell of cells) {
            let root = this.resolveRoot(cell, selected);
            if (root && root.getAttribute('element') && !duplicates[root.id]) {
                results.push(root);
                duplicates[root.id] = true;
            }
        }
        return results;
    }


    resolveRootAndLevel(cell: Element,
                        selected: {[key: string]: Element},
                        level: number): [Element, number] {
        if (selected[cell.id]) {
            let predecessors = cell.getPredecessors();
            if (predecessors && predecessors.length) {
                let max = level,
                    root = cell;
                for (let predecessor of predecessors) {
                    if (selected[predecessor.id]) {
                        let [element, height] = this.resolveRootAndLevel(
                            predecessor,
                            selected,
                            level + 1
                        );
                        if (element && selected[element.id]) {
                            if (height > max) {
                                max = height;
                                root = element;
                            }
                        } else {
                            root = predecessor;
                        }
                    }
                }
                return [root, max];
            }
        }
        return [null, null];
    }

    resolveRoot(cell: Layer, selected: {[key: string]: Element}): Element {
        if (cell.getAttribute('element')) {
            let element = this.resolveRootAndLevel(
                cell as Element,
                selected, 0
            );
            if (element) {
                return element[0];
            }
        } else {
            return null;
        }
    }
}

