


import {DialogService} from 'aurelia-dialog';
import {EditorContext, EditorOperations} from "common/lib/canvas";
import {CanvasAction} from "common/lib/canvas/actions";
import {GroupItemsAsDialog} from "./dialogs/group-items-as-dialog";

export class CreateGroupMenuItem extends CanvasAction {

    constructor(private dialogService: DialogService) {
        super(
            'Create Group',
            'cgroup',
            'assets/sui/themes/hasli/assets/images/object-group.svg'
        );
        this.setProperty('palette', '1');
        this.setProperty('canvas-menu', '1');
    }

    apply(editor: EditorContext): void {
        EditorOperations.set(editor, 'layer-type', 'Group');
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