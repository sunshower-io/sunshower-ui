import {Router} from "aurelia-router";
import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";


import {Identifier} from "common/lib/lang";


import {
    WorkspaceService ,
} from "common/model/api/workspace/service";

import {
    Workspace as WorkspaceElement,
} from "common/model/api/workspace/model";

@autoinject
export class Workspace {


    private workspaces: WorkspaceElement[];

    constructor(public router: Router,
                private client: HttpClient,
                private workspaceService: WorkspaceService) {

    }

    attached(): void {
        this.workspaceService.list().then(t => this.workspaces = t);

    }


    delete(id: string): void {
        this.client.fetch(`workspaces/${id}`, {
            method: 'delete'
        }).then(t => t.json() as any)
            .then(workspaces => this.workspaces = workspaces)
    }

    activate(id: any) {
        //console.log("ID", id);
    }


    open(id: Identifier): void {
        this.client.fetch(`workspaces/${id}`)
            .then(t => t.json() as any).then(t => {
            this.router.navigate(`workspace/${t.id}/applications`);
        });
    }

    newWorkspace(): void {
        this.router.navigate('workspace/workspace/create');
    }

}