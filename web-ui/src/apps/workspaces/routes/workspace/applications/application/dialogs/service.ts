import {DialogController} from "aurelia-dialog";
import {inject, bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {ApplicationTemplate} from "common/model/api/application/model"

@inject(DialogController, HttpClient)
export class ServiceDialog {

    @bindable
    service                         : string;

    private application             : ApplicationTemplate;

    constructor(
        private controller:DialogController,
        private client:HttpClient
    ) {

    }

    activate(application : ApplicationTemplate) : void {
        setTimeout(() => {
            this.application = application;
        }, 1000);
    }


    save()  : void {
        // this.application.requirements.push(this.service);
        //todo save application
        this.controller.ok(this.application);
    }

}