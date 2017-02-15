

import {DialogService} from 'aurelia-dialog';
import {EditorContext, EditorOperations} from "common/lib/canvas";
import {CanvasAction} from "common/lib/canvas/actions";
import {GroupItemsAsDialog} from "./dialogs/group-items-as-dialog";
import {VlanElementFactory} from "apps/workspaces/model/components/vlan";

export class CreateVLANMenuItem extends CanvasAction {

    constructor(private dialogService: DialogService) {
        super(
            'Create VLAN',
            'cvlan',
            'assets/sui/themes/hasli/assets/images/icons/provider/generic/vlan.svg'
        );
        this.setProperty('palette', '1');
        this.setProperty('canvas-menu', '1');
    }

    apply(editor: EditorContext): void {
        EditorOperations.set(editor, 'layer-type', 'VLAN');
        EditorOperations.set(editor, 'element-factory', new VlanElementFactory());
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