import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";
import {bindable, autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {Applications} from "apps/workspaces/routes/workspace/applications/applications";
import {Application} from "common/model/api/application/model";
import {NavigationInstruction} from "aurelia-router";
import {RemoteService, Remote} from "common/model/api/revision/revisions";
import {HttpClient} from "aurelia-fetch-client";

@autoinject
export class Settings {


    private remote          : Remote;
    private workspaceId     : string;

    @bindable
    private application     : Application;
    private loading         : boolean;

    @bindable
    private message:any;
    constructor(
                private client:HttpClient,
                private remoteService:RemoteService,
                private router: Router,
                private applications: Applications,
                private incompleteFeature: IncompleteFeature) {

    }

    saveRepository() : void {
        this.loading = true;
        this.remoteService.save(
            this.workspaceId,
            this.application.id,
            this.remote
        ).then(t => {
                this.loading = false;
                if(t) {
                    this.message = null;
                    this.application = t;
                }
            }
        )
        .catch(r => {
            r.then(t => {
                this.message = t;
            })
        });
    }

    // activate(params: any, a: any, workspace: NavigationInstruction) {
    //     this.loading = true;
    //     this.workspaceId = workspace.parentInstruction.parentInstruction.params.id;
    //     this.client.fetch(`workspaces/${this.workspaceId}/applications/${params.id}`)
    //         .then(t => t.json() as any)
    //         .then(t => {
    //             this.loading = false;
    //             this.application = t;
    //         });
    // }

}