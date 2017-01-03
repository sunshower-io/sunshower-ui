
import {
    AbstractMenuItem,
    MenuItem
} from 'common/elements/menu';

import {DialogService} from 'aurelia-dialog';
import {EditorContext} from "canvas/core/canvas";
import {CreateLayerDialog} from "./dialogs/create-layer-dialog";
import {CanvasAction} from "canvas/menu/action";

export default class CreateSecurityGroupMenuItem extends CanvasAction {

    constructor(private dialogService: DialogService) {
        super(
            'Create Security Group',
            'csg',
            'assets/sui/themes/hasli/assets/images/lock.svg'
        );
        this.setProperty('palette', '1');
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