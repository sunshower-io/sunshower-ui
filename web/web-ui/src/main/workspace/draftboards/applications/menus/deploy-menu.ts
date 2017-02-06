import {DialogService} from 'aurelia-dialog';
import {
    MenuItem,
    AbstractMenuItem
} from 'common/elements/menu';

import {
    EditorContext
} from "main/workspace/draftboards/editor";
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
