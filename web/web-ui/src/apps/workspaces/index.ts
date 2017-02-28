import {Router} from "aurelia-router";
import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

import {
    Workspace as WorkspaceModel
} from  'apps/workspaces/model/workspaces';

@autoinject
export class Workspace {



    private workspaces:WorkspaceModel;


    constructor(public router:Router, private client:HttpClient) {

    }

    attached() : void {
        this.client.fetch('workspaces/head')
            .then(t => t.json() as any)
            .then(workspaces => this.workspaces = workspaces)


    }

    open() : void {
        this.router.navigate("workspace/4/applications");
    }

    newWorkspace() : void {
        this.router.navigate('workspace/workspace/create');
    }

}