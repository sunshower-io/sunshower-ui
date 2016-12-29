import {
    AbstractMenuItem,
    MenuItem
} from 'common/elements/menu';

import {DialogService} from 'aurelia-dialog';
import {EditorContext} from "canvas/core/canvas";
import {CreateLayerDialog} from "./dialogs/create-layer-dialog";
export default class CreateLayerMenuItem extends AbstractMenuItem implements MenuItem {

    constructor(private dialogService: DialogService) {
        super();
        this.name = 'Create Layer';
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