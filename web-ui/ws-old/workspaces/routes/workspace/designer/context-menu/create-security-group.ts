

import {DialogService} from 'aurelia-dialog';
import {EditorContext, EditorOperations} from "common/lib/canvas";
import {CanvasAction} from "common/lib/canvas/actions";
import {GroupItemsAsDialog} from "./dialogs/group-items-as-dialog";
import {SecurityGroupElementFactory} from "apps/workspaces/model/components/security-group";
export class CreateSecurityGroupMenuItem extends CanvasAction {

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
        EditorOperations.set(editor, 'element-factory', new SecurityGroupElementFactory());
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