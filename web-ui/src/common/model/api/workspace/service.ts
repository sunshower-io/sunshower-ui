import {HttpClient} from "aurelia-fetch-client";
import {
    HttpClient as HttpBasicClient
} from 'aurelia-http-client';


import {Identifier} from "common/lib/lang";
import {Application} from 'common/model/api/application/model';
import {Workspace, SaveWorkspaceRequest} from './model';
import {autoinject} from "aurelia-dependency-injection";
import {Service, ServiceManager} from "common/model/service";
import {ConstraintViolationException} from "common/model/service";


@autoinject
export class WorkspaceService implements Service<Workspace> {

    public workspace: Workspace;

    constructor(private client: HttpClient,
                private httpClient: HttpBasicClient,
                private serviceManager: ServiceManager,) {
        serviceManager.register('workspaceId', this);
    }


    public initial() : Promise<Workspace> {
        return this.client.fetch('workspaces/initial')
            .then(t => new Workspace(t));
    }

    public save(workspaceRequest: SaveWorkspaceRequest): Promise<Workspace> {
        return this.httpClient
            .createRequest('workspaces')
            .asPut()
            .withHeader('accept', 'application/json')
            .withContent(workspaceRequest.toFormData())
            .skipContentProcessing()
            .send()
            .then(t => {
                if (!t.isSuccess) {
                    throw new ConstraintViolationException(t.content);
                } else {
                    return t;
                }
            })
            .then(t => t.content as any)
            .then(t => {
                this.workspace = new Workspace(t);
                let file = workspaceRequest.imageToFormData();
                if (file) {
                    return this.httpClient.put(`workspaces/${t.id}/image`, file)
                        .then(t => t.content as any)
                        .then(t => {
                            this.workspace = t;
                            return this.workspace
                        });
                } else {
                    return this.workspace;
                }
            });
    }


    getApplications(): Promise<Application[]> {
        return this.client.fetch(`workspaces/${this.workspace.id}/applications`)
            .then(t => t.json() as any)
            .then(t => t.map(u => {
                let a = new Application(u);
                a.image = this.imageUrl(a);
                return a;
            }));

    }


    public imageUrl(application): string {
        return `/hasli/api/v1/workspaces/${this.workspace.id}/applications/${application.id}/image`;
    }

    list(): Promise<Workspace[]> {
        return this.client.fetch('workspaces')
            .then(t => t.json() as any)
            .then(t => t.map(u => new Workspace(u)));
    }

    bind(key: string): Promise<Workspace> {
        if(Identifier.isIdentifier(key)) {
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
