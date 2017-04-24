import {
    HttpClient as HttpBasicClient
} from 'aurelia-http-client';
import {HttpClient} from "aurelia-fetch-client";


import {Workspace} from './model';
import {autoinject} from "aurelia-dependency-injection";
import {
    Service,
    ServiceManager
} from "lib/common/service";

import {Identifier} from "lib/common/lang/identifier";


@autoinject
export class WorkspaceService implements Service<Workspace> {

    public workspace: Workspace;
    private initialized: boolean;

    constructor(private client: HttpClient,
                private httpClient: HttpBasicClient,
                private serviceManager: ServiceManager) {
        console.log("construct");
        serviceManager.register('workspaceId', this);

    }


    search(input: string): Promise<Workspace[]> {
        return this.client.fetch('workspaces/search', {
            method: 'put',
            body: JSON.stringify({
                name: input,
                key: input
            })
        })
            .then(t => t.json() as any)
            .then(t => t.map(u => new Workspace(u)));
    }

    public initial(): Promise<Workspace> {
        return this.client.fetch('workspaces/initial')
            .then(t => t.json() as any)
            .then(t => new Workspace(t));
    }


    list(): Promise<Workspace[]> {
        if (!this.initialized) {
            return this.initialize().then(t => this.listAll());
        } else {
            return this.listAll();
        }
    }

    initialize(): Promise<Workspace> {
        return this.initial();
    }

    private listAll() : Promise<Workspace[]> {
        return this.client.fetch('workspaces')
            .then(t => t.json() as any)
            .then(t => t.map(u => new Workspace(u)));

    }


    bind(key: string): Promise<Workspace> {
        if (Identifier.isIdentifier(key)) {
            return this.client.fetch(`workspaces/${key}`)
                .then(t => t.json() as any)
                .then(t => {
                    this.workspace = new Workspace(t);
                    return this.workspace;
                });
        } else {
            return Promise.resolve(this.workspace);
        }
    }
}