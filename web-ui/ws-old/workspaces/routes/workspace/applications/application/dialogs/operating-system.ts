import {DialogController} from "aurelia-dialog";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {OperatingSystemService} from "common/model/api/hal/os";
import {OperatingSystem} from "common/model/api/hal/api";
import {ApplicationTemplate} from "common/model/api/application/model"

@inject(DialogController, HttpClient, OperatingSystemService)
export class OperatingSystemDialog {

    private application     : ApplicationTemplate;

    constructor(
        private controller:DialogController,
        private client:HttpClient,
        private osService:OperatingSystemService
    ) {

    }

    activate(application : ApplicationTemplate) : void {
        setTimeout(() => {
            this.application = application;
        }, 1000);
    }


    save(os: OperatingSystem)  : void {
        // this.application.requirements.push(os);
        //todo save application
        this.controller.ok(this.application);
    }

}