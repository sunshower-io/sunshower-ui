import {DialogController} from "aurelia-dialog";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {ApplicationTemplate} from "common/model/api/application/model"

@inject(
    DialogController,
    HttpClient
)
export class ApplicationDialog {

    loading             : boolean;
    applications        : any[];

    private application     : ApplicationTemplate;

    constructor(
        private controller:DialogController,
        private client:HttpClient
    ) {
        this.applications = [];
    }

    activate(application : ApplicationTemplate) : void {
        setTimeout(() => {
            this.application = application;
            this.loading = true;
            //todo fetch applications
            this.loading = false;
        }, 1000);
    }

    save(application : any) {
        // if (typeof application != 'undefined') {
        //     this.application.requirements.push(application);
        // }
        this.controller.ok(this.application);
    }

}