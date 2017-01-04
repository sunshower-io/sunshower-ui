
import {DialogService} from 'aurelia-dialog';
import {EditorContext, EditorOperations} from "canvas/core/canvas";
import {CanvasAction} from "canvas/menu/action";
import {GroupItemsAsDialog} from "./dialogs/group-items-as-dialog";


export default class CreateLayerMenuItem extends CanvasAction {

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