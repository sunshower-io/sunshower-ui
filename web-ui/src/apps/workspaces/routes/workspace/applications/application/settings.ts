import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";
import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {HttpClient} from "aurelia-http-client";
import {HttpClient as FetchClient} from "aurelia-fetch-client";
import {Applications} from "apps/workspaces/routes/workspace/applications/applications";
import {Application} from "common/model/api/sdk";
import {NavigationInstruction} from "aurelia-router";

@inject(HttpClient, FetchClient, Router, Applications)
export class Settings {

    private workspaceId     : string;
    private application     : Application;
    private loading         : boolean;

    constructor(private client: HttpClient,
                private fetchClient: FetchClient,
                private router: Router,
                private applications: Applications,
                private incompleteFeature: IncompleteFeature) {

    }

    saveRepository() : void {
        this.loading = true;
        let app = this.application;
        if (app.repository.remote.credential.credential == '' && app.repository.remote.credential.secret == '') {
            app.repository.remote.credential = null;
        }

        let form = new FormData();
        form.append('name', app.name);
        form.append('repository', JSON.stringify(app.repository));

        console.log('posting this', form);

        this.client.put(`workspaces/${this.workspaceId}/applications`, form)
            .then(t => JSON.parse(t.response))
            .then(t => {
                this.loading = false;
            })
    }

    activate(params: any, a: any, workspace: NavigationInstruction) {
        this.loading = true;
        this.workspaceId = workspace.parentInstruction.parentInstruction.params.id;
        this.fetchClient.fetch(`workspaces/${this.workspaceId}/applications/${params.id}`)
            .then(t => t.json() as any)
            .then(t => {
                this.loading = false;
                this.application = t;
                console.log('this.application', this.application);
            });
    }

}