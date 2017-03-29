import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";
import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {HttpClient} from "aurelia-http-client";
import {Applications} from "apps/workspaces/routes/workspace/applications/applications";
import {Application} from "common/model/api/sdk";


@inject(HttpClient, Router, Applications)
export class Settings {

    private workspaceId     : string;
    private application     : Application;
    private loading         : boolean;

    constructor(private client: HttpClient,
                private router: Router,
                private applications: Applications,
                private incompleteFeature: IncompleteFeature) {

    }

    saveRepository() : void {
        this.loading = true;
        let app = this.application;
        if (app && app.repository && app.repository.remote && app.repository.remote.location) {
            if (app.repository.remote.credential.credential == '' && app.repository.remote.credential.secret == '') {
                app.repository.remote.credential = null;
            }
        }

        let form = new FormData();
        // form.append('name', app.name);
        //TODO Josiah fill this out

        this.client.put(`workspaces/${this.workspaceId}/applications`, form)
            .then(t => JSON.parse(t.response))
            .then(t => {
                this.loading = false;
            })
    }

    activate(id: any) {
        this.workspaceId = id;
        this.application = new Application();
    }

}