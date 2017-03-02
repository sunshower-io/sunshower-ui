import {Router} from "aurelia-router";
import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

import {
    Workspace as WorkspaceModel
} from  'apps/workspaces/model/workspaces';
import {Identifier} from "common/lib/lang";

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

    delete(id:string) : void {
        this.client.fetch(`workspaces/${id}`, {method: 'delete'})
            .then(t => {
                this.client.fetch('workspaces/head')
                    .then(t => t.json() as any)
                    .then(workspaces => this.workspaces = workspaces)

            });
    }

    open(id:Identifier) : void {
        this.router.navigate(`workspace/${id.id}/applications`);
    }

    newWorkspace() : void {
        this.router.navigate('workspace/workspace/create');
    }

}