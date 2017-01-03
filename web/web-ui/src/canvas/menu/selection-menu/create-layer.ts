import {
    AbstractMenuItem,
    MenuItem
} from 'common/elements/menu';

import {DialogService} from 'aurelia-dialog';
import {EditorContext} from "canvas/core/canvas";
import {CreateLayerDialog} from "./dialogs/create-layer-dialog";
import {CanvasAction} from "canvas/menu/action";
export default class CreateLayerMenuItem extends CanvasAction {

    constructor(private dialogService: DialogService) {
        super(
            'Create Layer',
            'clayer',
            'assets/sui/themes/hasli/assets/images/layers.svg'
        );
        this.setProperty('canvas-menu', '1');
    }

    apply(editor: EditorContext): void {
        this.dialogService.open({
            viewModel:
            CreateLayerDialog,
            model: editor
        }).then((result) => {
            if (!result.wasCancelled) {

            } else {

            }
        });
    }


}