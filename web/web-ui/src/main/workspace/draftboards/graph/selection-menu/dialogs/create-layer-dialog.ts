import {EditorContext} from "../../../editor";
import {inject} from 'aurelia-framework';

import {mxCell} from 'mxgraph';

import {Layer} from 'elements/layer';
import {Element} from 'elements/elements';
import {DraftboardManager} from 'elements/draftboard';

@inject(DraftboardManager)
export class CreateLayerDialog {

    constructor(private draftboardManager:DraftboardManager) {

    }

    activate(model:EditorContext) : void {
        let host = model.graph,
            selection = host.getSelectionCells(),
            layer = new Layer(
                "new layer",
                "drap",
                this.toElements(selection)
            );

        this.draftboardManager.createLayer(layer);
    }

    private toElements(selection: mxCell[]) : Element[] {
        return [];
    }
}