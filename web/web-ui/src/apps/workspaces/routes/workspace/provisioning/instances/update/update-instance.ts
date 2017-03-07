import {DialogController} from "aurelia-dialog";
import {bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {autoinject} from "aurelia-dependency-injection";
/**
 * Created by dustinlish on 3/5/17.
 */

@autoinject
export class UpdateInstance {

    private id: string;
    private formPath = "apps/workspaces/routes/workspace/provisioning/instances/update/forms";

    @bindable viewModels = [`${this.formPath}/version-form`];
    @bindable modal;
    @bindable currentVersions;
    @bindable selectedVersion;

    constructor(private controller:DialogController, private client: HttpClient) {
    }

    //todo just pull form stuff into here

    activate(id) : void {

        // todo remove this if not testing hardcoded id
        this.id = id;
        // this.id = id.id;

        setTimeout(() => {
            this.client.fetch(`applications/${this.id}/revisions`)
                .then(t => t.json() as any)
                .then(t => {
                    this.currentVersions = t;
                });
        }, 500);
    }

    complete() : void {
        this.controller.ok();
    }

    // TODO saves current selectedVersion, when create button clicked use selectedVersion
    // to propogate changes
    selected() {
        console.log(this.selectedVersion);
        return true;
    }

}