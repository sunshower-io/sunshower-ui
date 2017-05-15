import {
    HttpClient as HttpBasicClient
} from 'aurelia-http-client';
import {HttpClient} from "aurelia-fetch-client";


import {Workspace, SaveWorkspaceRequest} from './model';
import {autoinject} from "aurelia-framework";
import {
    Service,
    ServiceManager,
    ConstraintViolationException
} from "lib/common/service";

import {Identifier} from "lib/common/lang/identifier";


@autoinject
export class WorkspaceService implements Service<Workspace> {

    public workspace: Workspace;

    constructor(private client: HttpClient,
                private httpClient: HttpBasicClient,
                private serviceManager: ServiceManager) {
        serviceManager.register('workspaceId', this);

    }


    // search(input: string): Promise<Workspace[]> {
    //     return this.client.fetch('workspaces/search', {
    //         method: 'put',
    //         body: JSON.stringify({
    //             name: input,
    //             key: input
    //         })
    //     })
    //         .then(t => t.json() as any)
    //         .then(t => t.map(u => new Workspace(u)));
    // }


    list(): Promise<Workspace[]> {
        return this.client.fetch('workspaces')
            .then(t => t.json() as any)
            .then(t => t.map(u => new Workspace(u)));
    }


    bind(key: string): Promise<Workspace> {
        console.log("WSSERVICE" + key);
        if (!this.workspace && Identifier.isIdentifier(key)) {
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

    public destroy(id: string) : Promise<any> {
        return this.client.fetch(`workspaces/${id}`, {
            method: 'delete'
        })
            .then(t => t.json() as any)
            .then(t => {return t});
    }

    public save(workspaceRequest: SaveWorkspaceRequest): Promise<Identifier> {
        workspaceRequest.key = workspaceRequest.name;
        return this.client.fetch('workspaces', {
            method: 'put',
            body: JSON.stringify(workspaceRequest)
        }).then(w => w.json() as any)
            .then(w => {
                return new Identifier(w.val);
            });


        // return this.httpClient
        //     .createRequest('workspaces')
        //     .asPut()
        //     .withHeader('accept', 'application/json')
        //     .withContent(workspaceRequest.toFormData())
        //     .skipContentProcessing()
        //     .send()
        //     .then(t => {
        //         if (!t.isSuccess) {
        //             throw new ConstraintViolationException(t.content);
        //         } else {
        //             return t;
        //         }
        //     })
        //     .then(t => t.content as any)
        //     .then(t => {
        //         this.workspace = new Workspace(t);
        //         let file = workspaceRequest.imageToFormData();
        //         if (file) {
        //             return this.httpClient.put(`workspaces/${t.id}/image`, file)
        //                 .then(t => t.content as any)
        //                 .then(t => {
        //                     this.workspace = t;
        //                     return this.workspace
        //                 });
        //         } else {
        //             return this.workspace;
        //         }
        //     });
    }

}