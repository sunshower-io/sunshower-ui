import {DialogController} from "aurelia-dialog";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {ApplicationRevision} from "apps/workspaces/model/application";

@inject(
    DialogController,
    HttpClient
)

export class InstancesDialog {

    private loading                 : boolean;

    private applicationRevision     : ApplicationRevision;
    private instances               : any[];


    constructor(
        private controller:DialogController,
        private client:HttpClient
    ) {
    }

    activate(applicationRevision : ApplicationRevision) : void {
        setTimeout(() => {
            this.applicationRevision = applicationRevision;
            this.loading = true;
            this.instances = [];
            this.loading = false;
        }, 1000);
    }

    save(instance : any) : void {
        this.applicationRevision.requirements.push(instance);
        //todo save applicationRevision
        this.controller.ok(this.applicationRevision);
    }

}