import {HttpClient as HttpBasicClient} from 'aurelia-http-client';
import {HttpClient as HttpFetchClient} from 'aurelia-fetch-client';

import {autoinject} from 'aurelia-framework';
import {Service} from "common/model/service";
import {WorkspaceService} from "common/model/api/workspace/service";
import {Application, SaveApplicationRequest} from './model'
import {ServiceManager} from "common/model/common/service-manager";
import {Identifier} from "common/lib/lang";
import {ConstraintViolationException} from "common/model/service/service";


@autoinject
export class ApplicationService implements Service<Application> {
    public application: Application;

    constructor(private basicClient: HttpBasicClient,
                private fetchClient: HttpFetchClient,
                private serviceManager: ServiceManager,
                private workspaceService: WorkspaceService
    ) {
        serviceManager.register('applicationId', this);

    }


    save(application: SaveApplicationRequest): Promise<Application> {
        return this.basicClient.createRequest(this.workspaceScopedUrl())
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
                this.application = new Application(t);
                return this.application;
            });
    }


    bind(key: string): Promise<Application> {
        if (Identifier.isIdentifier(key)) {
            this.fetchClient.fetch(this.workspaceScopedUrl(key))
                .then(t => t.json() as any)
                .then(t => {
                    this.application = new Application(t);
                    return this.application;
                });
        } else {
            return Promise.resolve(this.application);
        }
    }

    private workspaceScopedUrl(...values: string[]): string {
        let ws = this.workspaceService.workspace;
        if (values && values.length) {
            return `workspace/${ws.id}/applications/${values.join('/')}`;
        }
        return `workspace/${ws.id}/applications`;
    }

}

