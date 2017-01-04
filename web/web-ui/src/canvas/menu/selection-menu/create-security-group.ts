
import {
    AbstractMenuItem,
    MenuItem
} from 'common/elements/menu';

import {DialogService} from 'aurelia-dialog';
import {EditorContext, EditorOperations} from "canvas/core/canvas";
import {CanvasAction} from "canvas/menu/action";
import {
    GroupItemsAsDialog
} from "./dialogs/group-items-as-dialog";

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
        EditorOperations.set(editor, 'layer-type', 'Security Group');
        this.dialogService.open({
            model: editor,
            viewModel: GroupItemsAsDialog
        }).then((result) => {
            if (!result.wasCancelled) {

            } else {

            }
        });
    }


}