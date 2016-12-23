import {EditorContext} from "../../../editor";
import {inject} from 'aurelia-framework';

import {mxCell} from 'mxgraph';

import {Layer} from 'elements/layer';
import {Element} from 'elements/elements';
import {DraftboardManager} from 'elements/draftboard';

@inject(DraftboardManager)
export class CreateLayerDialog {

    private model:EditorContext;

    constructor(private draftboardManager:DraftboardManager) {

    }

    activate(model:EditorContext) : void {
        this.model = model;
    }

    save() : void {
        let
            model = this.model,
            host = model.graph,
            selection = host.getSelectionCells(),
            layer = new Layer(
                "new layer",
                "drap",
                this.toElements(selection)
            );

        this.draftboardManager.createLayer(layer);
    }

    private toElements(selection: mxCell[]) : Element[] {
        let results = [];
        let cache = {};
        for(let e of selection) {
            let ae = <any> e;
            if(ae.data && ae.data.id) {
                cache[ae.data.id.value] = ae.data as Element;
            }
        }

        let topLevels = {};

        for(let cell of selection) {
            let acell = cell as any;
            if(acell.data && acell.data.children) {
                let topLevel = this.findTopLevel(acell.data as Element, cache);
                if(topLevel) {
                    if(!topLevels[topLevel.id.value]) {
                        topLevels[topLevel.id.value] = topLevel;
                        results.push(topLevel);
                    }
                }
            }
        }
        return results;
    }

    findTopLevel(element:Element, elements:{[key:string]:Element}) : Element {
        let current = element;
        while(current.parent) {
            let next = elements[current.parent.id.value];
            if(next) {
                current = next;
            } else {
                break;
            }
        }
        return current;
    }
}