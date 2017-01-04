

import {DialogService} from 'aurelia-dialog';
import {EditorContext, EditorOperations} from "canvas/core/canvas";
import {CanvasAction} from "canvas/menu/action";
import {GroupItemsAsDialog} from "./dialogs/group-items-as-dialog";

export default class CreateVLANMenuItem extends CanvasAction {

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