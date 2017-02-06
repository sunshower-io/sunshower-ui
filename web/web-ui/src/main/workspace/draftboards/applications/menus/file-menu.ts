import {
    MenuItem,
    AbstractMenuItem
} from 'common/elements/menu';
import {EditorContext} from "main/workspace/draftboards/editor";
import {DialogService} from 'aurelia-dialog';
import {SaveDialog} from "./file/save-dialog";
import DeployMenu from "./deploy-menu";


export default class FileMenu extends AbstractMenuItem implements MenuItem {
    style: string = 'code icon';
    name: string = 'File';
    menus = [];

    constructor(service: DialogService) {
        super();
        this.addMenu(new SaveMenu(service));
        this.addMenu(new ImportMenu());
        this.addMenu(new ExportMenu());
        this.addMenu(new DeployMenu(service));
    }

}

export class SaveMenu extends AbstractMenuItem {
    name: string = 'Save';

    showExtraData = false;

    constructor(private dialogService: DialogService) {
        super();

    }

    apply(editor: EditorContext): void {
        this.dialogService.open({
            viewModel: SaveDialog,
        }).then((result) => {
            if (!result.wasCancelled) {
                console.log(result.output);
            }
        });
    }
}

export class ImportMenu extends AbstractMenuItem {
    name: string = 'Import';
}

export class ExportMenu extends AbstractMenuItem {
    name: string = 'Export';
}
