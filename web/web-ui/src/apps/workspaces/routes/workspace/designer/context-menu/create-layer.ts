

import {DialogService} from 'aurelia-dialog';
import {EditorContext, EditorOperations} from "common/lib/canvas";
import {CanvasAction} from "common/lib/canvas/actions";
import {GroupItemsAsDialog} from "./dialogs/group-items-as-dialog";
import {LayerElementFactory} from "apps/workspaces/model/components/layer";

export class CreateLayerMenuItem extends CanvasAction {

    constructor(private dialogService: DialogService) {
        super(
            'Create Layer',
            'clayer',
            'assets/sui/themes/hasli/assets/images/layers.svg'
        );
        this.setProperty('palette', '1');
        this.setProperty('canvas-menu', '1');
    }

    apply(editor: EditorContext): void {
        EditorOperations.set(editor, 'layer-type', 'Layer');
        EditorOperations.set(editor, 'element-factory', new LayerElementFactory());

        this.dialogService.open({
            viewModel: GroupItemsAsDialog,
            model: editor
        }).then((result) => {
            if (!result.wasCancelled) {

            } else {

            }
        });
    }


}