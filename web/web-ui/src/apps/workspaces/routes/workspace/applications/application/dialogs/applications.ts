import {DialogController} from "aurelia-dialog";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {ApplicationRevision} from "apps/workspaces/model/application";

@inject(
    DialogController,
    HttpClient
)
export class ApplicationDialog {

    applications        : any[];

    private applicationRevision     : ApplicationRevision;

    constructor(
        private controller:DialogController,
        private client:HttpClient
    ) {
        this.applications = [];
    }

    activate(applicationRevision : ApplicationRevision) : void {
        setTimeout(() => {
            this.applicationRevision = applicationRevision;
        }, 1000);
    }

    save(application : any) {
        if (typeof application != 'undefined') {
            this.applicationRevision.requirements.push(application);
        }
        this.controller.ok(this.applicationRevision);
    }

}