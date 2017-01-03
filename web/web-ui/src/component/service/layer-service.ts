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
            roots = this.resolveRoots(
                canvas.getSelectionCells()
            );
        this.draftboardManager
            .removeAll(roots);


        layer.addElements(roots);
        this.draftboardManager.add(layer);

        try {
            canvas.getModel().beginUpdate();

            let boundingBox = canvas.getBoundingBoxFromGeometry(roots, true);
            let geometry = new mxGeometry(
                boundingBox.x - 48,
                boundingBox.y - 48,
                boundingBox.width + 96,
                boundingBox.height + 96
            );
            layer.geometry = geometry;
            layer.addTo(canvas);

            // canvas.groupCells(layer, 48, roots);
        } finally {
            canvas.getModel().endUpdate();
        }
        return layer;

    }

    aggregate(selection:Layer[]) : {[key:string]: Element} {
        let result = {};
        for(let select of selection) {
            result[select.id] = selection;
        }
        return result;
    }


    resolveRoots(cells:Layer[]) : Element[] {
        let results = [],
            duplicates = {},
            selected = this.aggregate(cells);
        for(let cell of cells) {
            let root = this.resolveRoot(cell, selected);
            if(root && root.getAttribute('element') && !duplicates[root.id]) {
                results.push(root);
                duplicates[root.id] = true;
            }
        }
        return results;
    }


    resolveRootAndLevel(
        cell:Element,
        selected:{[key:string]:Element},
        level:number
    ) : [Element, number] {
        let predecessors = cell.getPredecessors();
        if(predecessors && predecessors.length) {
            let max = level,
                root = cell;
            for(let predecessor of predecessors) {

                if(selected[predecessor.id] === predecessor) {
                    return [predecessor, level];
                }

                let [element, height] = this.resolveRootAndLevel(
                    predecessor,
                    selected,
                    level + 1
                );
                if(height > max) {
                    max = height;
                    root = element;
                }
            }
            return [root, max];
        } else {
            return [cell, level];
        }

    }

    resolveRoot(cell:Layer, selected:{[key:string]: Element}) : Element {
        if(cell.getAttribute('element')) {
            let [element, ] = this.resolveRootAndLevel(
                cell as Element,
                selected, 0
            );
            return element;
        } else {
            return null;
        }
    }
}

