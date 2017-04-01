import {Router} from "aurelia-router";
import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

import {ApplicationContext} from 'apps/workspaces/model/application-context';

import {Identifier} from "common/lib/lang";
import {
    Workspace as WorkspaceElement,
    WorkspaceService
} from "common/model/api/core/workspace";

@autoinject
export class Workspace {


    private workspaces: WorkspaceElement[];

    constructor(public router: Router,
                private client: HttpClient,
                private context: ApplicationContext,
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
            this.context.workspace = t;
            this.router.navigate(`workspace/${t.id}/applications`);
        });
    }

    newWorkspace(): void {
        this.router.navigate('workspace/workspace/create');
    }

}