
import {DialogService} from 'aurelia-dialog';
import {AbstractMenuItem} from 'common/lib/widget';
import {EditorContext} from "apps/workspaces/routes/workspace/designer/editor";
import {ExecutionDialog} from "./execution/execution-dialog";

export default class ViewExecutionOrderMenuItem extends AbstractMenuItem {
    name        :  string;
    style       : string = 'connectdevelop icon';



    constructor(private dialogService:DialogService) {
        super();
    }

    apply(editor:EditorContext) : void {
        this.dialogService.open({
            viewModel: ExecutionDialog,
        });
    }

}