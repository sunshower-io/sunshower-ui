
import {mxCell} from 'mxgraph';
import {Layer} from 'elements/layer';
import {Element} from 'elements/elements';
import {inject} from 'aurelia-framework';
import {DraftboardManager} from 'elements/draftboard';
import {Builder} from "main/workspace/draftboards/graph/builder";
import {EditorContext} from "main/workspace/draftboards/editor";
import {Layer as GLayer} from "main/workspace/draftboards/cells/layer";


@inject(DraftboardManager)
export class LayerService {
    constructor(private draftboardManager: DraftboardManager) {

    }


    create(name: string,
           description: string,
           model: EditorContext): Layer {

        let
            host = model.graph,
            selection = host.getSelectionCells(),
            r = this.toElements(selection),
            layer = new Layer(
                name,
                description,
                r.data
            );

        let
            parent = host.getDefaultParent(),
            glayer = new GLayer(parent, layer, 0, 0, null);

        for (let e of r.data) {
            e.parent = layer;
        }

        glayer.addTo(host as Builder);

        host.groupCells(glayer, 50, r.elements);

        this.draftboardManager.createLayer(layer);

        return layer;

    }

    private toElements(selection: mxCell[]): result {
        let results = new result();
        let cache = {};
        for (let e of selection) {
            let ae = <any> e;
            if (ae.data && ae.data.id) {
                cache[ae.data.id.value] = [ae, ae.data as Element];
            }
        }

        let topLevels = {};
        for (let cell of selection) {
            let acell = cell as any;
            if (acell.data && acell.data.children) {
                let [topLevel, data] = this.findTopLevel([acell, acell.data as Element], cache);
                if (topLevel) {
                    if (!topLevels[data.id.value]) {
                        topLevels[data.id.value] = [topLevel, data];
                        results.data.push(data);
                        results.elements.push(topLevel);
                    }
                }
            }
        }
        return results;
    }

    private findTopLevel(element: [mxCell, Element],
                         elements: {[key: string]: [mxCell, Element]}): [mxCell, Element] {
        let current = element;
        while (current[1].parent) {
            let next = elements[current[1].parent.id.value];
            if (next) {
                current = next;
            } else {
                break;
            }
        }
        return current;
    }
}

class result {
    elements    : mxCell[];
    data        : Element[];

    constructor() {
        this.elements = [];
        this.data = [];
    }
}
