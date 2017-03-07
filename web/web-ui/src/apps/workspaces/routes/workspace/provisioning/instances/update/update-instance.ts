import {DialogController} from "aurelia-dialog";
import {inject, bindable} from "aurelia-framework";
/**
 * Created by dustinlish on 3/5/17.
 */

@inject(DialogController)
export class UpdateInstance {


    constructor(private controller:DialogController) {}

    //todo just pull form stuff into here



    activate() : void {
        setTimeout(() => {
            //set anything pertinent here
        }, 1000);
    }

    complete() : void {
        this.controller.ok();
    }


    formPath = "apps/workspaces/routes/workspace/provisioning/instances/update/forms";

    @bindable
    viewModels = [
        `${this.formPath}/version-form`,
    ];

    @bindable modal;



}