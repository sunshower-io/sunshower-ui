import {Router} from "aurelia-router";
import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

import {ApplicationContext} from 'apps/workspaces/model/application-context';

import {Identifier} from "common/lib/lang";
import {Workspace as WorkspaceModel} from "./model/workspaces/workspace";
import {UUID} from "common/lib/utils/uuid";
import {ChannelSet} from "../../common/lib/events/websockets";
import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";

@autoinject
export class Workspace {


    private workspaces: WorkspaceModel[];

    constructor(public router: Router,
                private client: HttpClient,
                private context: ApplicationContext,
                private incompleteFeature: IncompleteFeature) {

    }

    attached(): void {
        this.client.fetch('workspaces/head')
            .then(t => t.json() as any)
            .then(workspaces => this.workspaces = workspaces);

    }


    delete(id: string): void {
        this.client.fetch(`workspaces/${id}`, {method: 'delete'})
            .then(t => {
                this.client.fetch('workspaces/head')
                    .then(t => t.json() as any)
                    .then(workspaces => this.workspaces = workspaces)

            });
    }

    activate(id: any) {
        console.log("ID", id);
    }


    open(id: Identifier): void {
        console.log("OPEN", id);
        this.context.workspaceRevision.id = id;
        this.client.fetch(`workspaces/${id.id}`)
            .then(t => t.json() as any).then(t => {
            this.context.workspace = t;
            this.router.navigate(`workspace/${t.id}/applications`);
        });
    }

    newWorkspace(): void {
        this.router.navigate('workspace/workspace/create');
    }

}