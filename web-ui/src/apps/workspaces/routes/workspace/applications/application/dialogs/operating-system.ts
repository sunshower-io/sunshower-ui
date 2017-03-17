import {DialogController} from "aurelia-dialog";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {OperatingSystemService} from "common/model/api/hal/os";
import {ApplicationRevision} from "apps/workspaces/model/application";
import {OperatingSystem} from "common/model/api/hal/api";

@inject(DialogController, HttpClient, OperatingSystemService)
export class OperatingSystemDialog {

    private applicationRevision     : ApplicationRevision;

    constructor(
        private controller:DialogController,
        private client:HttpClient,
        private osService:OperatingSystemService
    ) {

    }

    activate(applicationRevision : ApplicationRevision) : void {
        setTimeout(() => {
            this.applicationRevision = applicationRevision;
        }, 1000);
    }


    save(os: OperatingSystem)  : void {
        this.applicationRevision.requirements.push(os);
        //todo save applicationRevision
        this.controller.ok(this.applicationRevision);
    }

}