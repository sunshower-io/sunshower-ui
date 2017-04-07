import {HttpClient as HttpBasicClient} from 'aurelia-http-client';
import {HttpClient as HttpFetchClient} from 'aurelia-fetch-client';

import {autoinject} from 'aurelia-framework';
import {Service} from "common/model/service";
import {WorkspaceService} from "common/model/api/workspace/service";
import {Application, SaveApplicationRequest, ApplicationTemplate} from './model'
import {ServiceManager} from "common/model/common/service-manager";
import {Identifier} from "common/lib/lang";
import {ConstraintViolationException} from "common/model/service/service";
import {NavigationInstruction} from "aurelia-router";
import {Remote} from "../revision/revisions";


@autoinject
export class ApplicationService implements Service<Application> {
    public application                  : Application;

    private applicationPromise          : Promise<Application>;

    constructor(private basicClient: HttpBasicClient,
                private fetchClient: HttpFetchClient,
                private serviceManager: ServiceManager,
                private workspaceService: WorkspaceService) {
        serviceManager.register('applicationId', this);

    }

    ls(filePath: string) : Promise<any> {
        return this.fetchClient.fetch(`${this.path()}/workspace/children`, {
            method: 'put',
            body: JSON.stringify({
                path: filePath
            })
        }).then(t => t.json() as any);
    }

    open(filePath: string): Promise<any> {
        return this.fetchClient.fetch(`${this.path()}/workspace/file`, {
            method: 'put',
            body: JSON.stringify({
                path: filePath
            })
        })
        .then(t => t.json() as any)
        .then(t => {
            if (t.children.child && t.children.child.length > 0) {
                let child = t.children.child[0];
                return this.fetchClient
                    .fetch(`${this.path()}/workspace/${child.revision}`)
                    .then(u => u.json() as any);
            } else {
                return Promise.reject("no thing");
            }
        });


    }


    save(application: SaveApplicationRequest): Promise<Application> {
        let ws = this.workspaceService.workspace;
            return this.fetchClient.fetch(`workspaces/${ws.id}/applications`, {
                method: 'put',
                body: JSON.stringify(application)
            })
            .then(t => t.json() as any)
            .then(t => {
                let file = application.imageToFormData();
                if (file) {
                    let url = this.imageUrl(t.id);
                    return this.basicClient.post(url, file)
                        .then(u => {
                            return t;
                        });
                }
                this.application = new Application(t);
                return this.application;
            });
    }

    public saveRemote(remote: Remote): Promise<ApplicationTemplate> {
        return this.fetchClient.fetch(
            this.remoteUrl(this.workspaceId(), this.application.id, 'remote'), {
                method: 'put',
                body: JSON.stringify(this.cleanse(remote))
            })
            .then(t => {
                if (!t.ok) {
                    throw t.json() as any;
                }
                return t.json() as any
            })
            .then(t => {
                this.application = new Application(t);
                this.application.image = `/hasli/api/v1/workspaces/${this.workspaceId()}/applications/${this.application.id}/image`;
                return this.application;
            });
    }



    public bind(key: string): Promise<Application> {
        if (Identifier.isIdentifier(key)) {
            return this.fetchClient.fetch(this.workspaceScopedUrl(key))
                .then(t => t.json() as any)
                .then(t => {
                    let app = new Application(t);
                    app.image = `/hasli/api/v1/workspaces/${this.workspaceId()}/applications/${t.id}/image`;
                    this.application = app;
                    return app;
                });
        } else {
            return Promise.resolve(this.application);
        }
    }

    private workspaceScopedUrl(...values: string[]): string {
        let ws = this.workspaceService.workspace;
        if (values && values.length) {
            return `workspaces/${ws.id}/applications/${values.join('/')}`;
        }
        return `workspaces/${ws.id}/applications`;
    }

    private workspaceId(): string {
        return this.workspaceService.workspace.id;
    }

    public imageUrl(applicationId: string): string {
        return `workspaces/${this.workspaceId()}/applications/${applicationId}/image`;
    }


    private cleanse(remote: Remote): Remote {
        let credential = remote.credential;
        if (credential && (this.isEmpty(credential.secret)
            || this.isEmpty(credential.credential))) {
            remote.credential = null;
        }
        return remote;
    }

    private isEmpty(st: string): boolean {
        return !st || st.trim().length == 0;
    }

    private remoteUrl(workspaceId: string, applicationId: string, subpath?: string): string {
        if (subpath) {
            return `workspaces/${workspaceId}/applications/${applicationId}/${subpath}`
        }
        return `workspaces/${workspaceId}/applications/${applicationId}`
    }

    private path(): string {
        return `workspaces/${this.workspaceId()}/applications/${this.application.id}`;
    }
}
