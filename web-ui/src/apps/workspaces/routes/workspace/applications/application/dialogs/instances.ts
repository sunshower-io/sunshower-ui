import {DialogController} from "aurelia-dialog";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {ApplicationTemplate} from "common/model/api/application/model"

@inject(
    DialogController,
    HttpClient
)

export class InstancesDialog {

    private loading                 : boolean;

    private application     : ApplicationTemplate;
    private instances               : any[];


    constructor(
        private controller:DialogController,
        private client:HttpClient
    ) {
    }

    activate(application : ApplicationTemplate) : void {
        setTimeout(() => {
            this.application = application;
            this.loading = true;
            this.instances = [];
            this.loading = false;
        }, 1000);
    }

    save(instance : any) : void {
        // this.application.requirements.push(instance);
        //todo save application
        this.controller.ok(this.application);
    }

}