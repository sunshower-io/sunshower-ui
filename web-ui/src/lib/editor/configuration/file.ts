import {DialogController} from "aurelia-dialog";
import {bindable, autoinject} from "aurelia-framework";
import {VersionedItem, Version} from "apps/workspaces/lib/model/core/orchestration-template/model";

@autoinject
export class ConfigurationFileEditor {

    @bindable
    private model: VersionedItem;

    constructor(private controller:DialogController) {

    }

    activate(model: VersionedItem) {
        this.model = model;
    }

    complete() : void {
        this.controller.ok();
    }
}