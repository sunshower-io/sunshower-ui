/**
 * Created by dustinlish on 2/19/17.
 */

import {
    autoinject,
    customElement
} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";


import {Application} from "common/model/api/sdk";
import {Router} from "aurelia-router";
import {Applications} from "apps/workspaces/routes/workspace/applications/applications";

@autoinject
@customElement('create-app')
export class CreateApp {

    private workspaceId     : string;
    private application     : Application;


    constructor(
        private client:HttpClient,
        private router:Router,
        private applications:Applications
    ) {
        this.application = new Application();
    }


    submit() : void {
        let app = this.application;
        if(app.repository && app.repository.remote) {
            app.repository.remote.name = "fraptest";
        }

        this.client.fetch(`workspaces/${this.workspaceId}/applications`, {
            method: 'put',
            body: JSON.stringify(app)
        }).then(t => t.json() as any).then(t => {
            this.applications.close();
        })
    }

    activate(id: any) {
        this.workspaceId = id;
    }

}

