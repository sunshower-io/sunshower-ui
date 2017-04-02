import {HttpClient as HttpBasicClient} from 'aurelia-http-client';
import {HttpClient as HttpFetchClient} from 'aurelia-fetch-client';

import {autoinject} from 'aurelia-framework';
import {Service} from "common/model/service";
import {WorkspaceService} from "common/model/api/workspace/service";
import {Application, SaveApplicationRequest} from './model'
import {ServiceManager} from "common/model/common/service-manager";
import {Identifier} from "common/lib/lang";
import {ConstraintViolationException} from "common/model/service/service";
import {NavigationInstruction} from "aurelia-router";


@autoinject
export class ApplicationService implements Service<Application> {
    public application: Application;

    constructor(private basicClient: HttpBasicClient,
                private fetchClient: HttpFetchClient,
                private serviceManager: ServiceManager,
                private workspaceService: WorkspaceService) {
        serviceManager.register('applicationId', this);

    }


    save(application: SaveApplicationRequest): Promise<Application> {
        let ws = this.workspaceService.workspace;
        return this.basicClient.createRequest(`workspaces/${ws.id}/applications`)
            .asPut()
            .withHeader('accept', 'application/json')
            .withContent(application.toFormData())
            .skipContentProcessing()
            .send()
            .then(t => {
                if (t.isSuccess) {
                    return t;
                } else {
                    throw new ConstraintViolationException(t.content);
                }
            })
            .then(t => t.content as any)
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



    bind(key: string): Promise<Application> {
        if (Identifier.isIdentifier(key)) {
            this.fetchClient.fetch(this.workspaceScopedUrl(key))
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


}
