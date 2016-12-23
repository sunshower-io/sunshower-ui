import {EditorContext} from "../../../editor";
import {inject, bindable} from 'aurelia-framework';

import {mxCell} from 'mxgraph';

import {Layer as GLayer} from '../../../cells/layer';
import {Layer} from 'elements/layer';
import {Element} from 'elements/elements';
import {DraftboardManager} from 'elements/draftboard';
import {Builder} from "../../builder";

@inject(DraftboardManager)
export class CreateLayerDialog {

    @bindable
    private name        :string;

    @bindable
    private description         : string;

    private model: EditorContext;

    constructor(private draftboardManager: DraftboardManager) {

    }

    activate(model: EditorContext): void {
        this.model = model;
    }

    save(): void {
        let
            model = this.model,
            host = model.graph,
            selection = host.getSelectionCells(),
            result = this.toElements(selection),
            layer = new Layer(
                this.name,
                this.description,
                result.data
            );

        let
            parent = host.getDefaultParent(),
            glayer = new GLayer(parent, layer, 0, 0, null);

        for(let e of result.data) {
            e.parent = layer;
        }

        glayer.addTo(host as Builder);

        host.groupCells(glayer, 50, result.elements);

        this.draftboardManager.createLayer(layer);
        this.name = "";
        this.description = "";
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

    data: Element[];
    elements: mxCell[];

    constructor() {
        this.elements = [];
        this.data = [];
    }
}