import {
    customElement,
    bindable,
    autoinject,
    containerless
} from "aurelia-framework";
import {UUID} from 'lib/common/lang';
import {DesignerManager} from "lib/designer/core";
import {VersionedItem, Version} from "apps/workspaces/lib/model/core/orchestration-template/model";
import {DialogService} from "aurelia-dialog";
import {ConfigurationFileEditor} from "lib/editor/configuration/file";

@containerless
@autoinject
@customElement('menu-bar')
export class MenuBar {
    @bindable
    private controlId                       : string;

    @bindable
    private templateDD                      : HTMLElement;

    @bindable
    private model                           : VersionedItem;

    constructor(private manager:DesignerManager, private dialogService: DialogService) {
        this.controlId = UUID.randomUUID().value;
    }

    activate() {

    }

    attached() {
        $(this.templateDD).dropdown();
    }

    save() : void {
        this.manager.fire('save');
    }

    undo() : void {
        this.manager.undo();
    }

    redo() : void {
        this.manager.redo();
    }

    configureFile() : void {
        // console.log("hook me up, pl0x");
        this.dialogService.open({
            viewModel: ConfigurationFileEditor,
            model: this.model
        }).then(t => {
            console.log(t);
            // this.open(t.id);
        });
    }

}