import {DialogService} from 'aurelia-dialog';
import {AbstractMenuItem, MenuItem} from 'common/lib/widget';
import {EditorContext} from "apps/workspaces/routes/workspace/designer/editor";
import {DeployDialog} from "./file/deploy-dialog";

export default class DeployMenu extends AbstractMenuItem implements MenuItem {
    style: string = 'right arrow';
    name: string = 'Deploy';

    constructor(private dialogService:DialogService) {
        super();
    }

    apply(editor: EditorContext): void {

        this.dialogService.open({
            viewModel:DeployDialog
        });

    }

}
