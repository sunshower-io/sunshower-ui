import {DialogService} from "aurelia-dialog";
import {CanvasAction} from "common/lib/canvas/actions";
import {
    EditorContext,
    EditorOperations
} from "common/lib/canvas";

import {GroupItemsAsDialog} from "./dialogs/group-items-as-dialog";
import {BlockElementFactory} from "apps/workspaces/model/components/block";

export class CreateBlockMenuItem extends CanvasAction {

    constructor(private dialogService: DialogService) {
        super(
            'Create Block',
            'cblock',
            'assets/sui/themes/hasli/assets/images/cube.svg'
        );
        this.setProperty('palette', '1');
        this.setProperty('canvas-menu', '1');
    }

    apply(editor: EditorContext): void {
        EditorOperations.set(editor, 'layer-type', 'Block');
        EditorOperations.set(editor, 'element-factory', new BlockElementFactory());
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
