import {
    AbstractMenuItem,
    MenuItem
} from 'common/elements/menu';
import {DialogService} from "aurelia-dialog";
import {EditorContext} from "canvas/core/canvas";
import {CreateLayerDialog} from "./dialogs/create-layer-dialog";
import {CanvasAction} from "../action";

export default class CreateBlockMenuItem extends CanvasAction {

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
