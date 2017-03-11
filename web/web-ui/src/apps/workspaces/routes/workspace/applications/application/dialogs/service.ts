import {DialogController} from "aurelia-dialog";
import {inject, bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {ApplicationRevision} from "apps/workspaces/model/application";
import {OperatingSystem} from "common/model/api/hal/api";

@inject(DialogController, HttpClient)
export class ServiceDialog {

    @bindable
    service                         : string;

    private applicationRevision     : ApplicationRevision;

    constructor(
        private controller:DialogController,
        private client:HttpClient
    ) {

    }

    activate(applicationRevision : ApplicationRevision) : void {
        setTimeout(() => {
            this.applicationRevision = applicationRevision;
        }, 1000);
    }


    save()  : void {
        this.applicationRevision.requirements.push(this.service);
        //todo save applicationRevision
        this.controller.ok(this.applicationRevision);
    }

}