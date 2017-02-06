
import {DialogService} from 'aurelia-dialog';
import {AbstractMenuItem} from 'common/elements/menu';
import {EditorContext} from "main/designer/draftboards/editor";
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