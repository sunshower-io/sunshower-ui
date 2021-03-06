import {
    HttpClient as HttpBasicClient
} from 'aurelia-http-client';
import {HttpClient} from "aurelia-fetch-client";


import {Workspace, SaveWorkspaceRequest} from './model';
import {autoinject} from "aurelia-framework";
import {
    Service,
    ServiceManager
} from "lib/common/service";

import {Identifier} from "lib/common/lang/identifier";
import {Subject} from "rxjs/Subject";
import {OrchestrationTemplate, Version} from "../orchestration-template/model";


@autoinject
export class WorkspaceService implements Service<Workspace> {

    public workspace: Workspace;

    public template: OrchestrationTemplate;

    static readonly paramName: string = 'workspaceId';

    private currentId: string;

    private currentTemplateId: string;

    private subject: Subject<Workspace>;

    constructor(private client: HttpClient,
                private httpClient: HttpBasicClient,
                private serviceManager: ServiceManager) {
        serviceManager.register(WorkspaceService.paramName, this);
        this.subject = new Subject();

    }


    list(): Promise<Workspace[]> {
        return this.client.fetch('workspaces')
            .then(t => t.json() as any)
            .then(t => t.map(u => new Workspace(u)));
    }

    current(): Promise<Workspace> {
        let ws = this.workspace;
        if (ws && ws.id === this.currentId) {
            return Promise.resolve(ws);
        } else {
            return this.client.fetch(`workspaces/${this.currentId}`)
                .then(w => w.json() as any)
                .then(w => {
                    return new Workspace(w);
                });
        }
    }


    bind(key: string): Promise<Workspace> {
        if (Identifier.isIdentifier(key)) {
            this.currentId = key;
            return this.current();
        } else {
            return Promise.resolve(this.workspace);
        }
    }

    public destroy(id: string): Promise<any> {
        return this.client.fetch(`workspaces/${id}`, {
            method: 'delete'
        }).then(t => t.json() as any);
    }

    public save(workspaceRequest: SaveWorkspaceRequest): Promise<Identifier> {
        workspaceRequest.key = workspaceRequest.name;
        return this.client.fetch('workspaces', {
            method: 'put',
            body: JSON.stringify(workspaceRequest)
        }).then(w => w.json() as any).then(w => new Identifier(w.id));
    }
    
    public async getTemplatesForCurrent() : Promise<OrchestrationTemplate[]> {
        let current = await this.current();
        return this.getTemplates(current.id) ;
    }

    public async getTemplates(workspaceId: string) : Promise<OrchestrationTemplate[]> {
        let result = await this.client.fetch(`workspaces/${workspaceId}/templates`),
            json = await result.json();
        return json.map(t => new OrchestrationTemplate(t));
    }

    public addTemplate(workspaceId: string, orchestrationTemplate: OrchestrationTemplate): Promise<Identifier> {
        return this.client.fetch(`workspaces/${workspaceId}/templates`, {
            method: 'put',
            body: JSON.stringify(orchestrationTemplate)
        }).then(t => t.json() as any)
            .then(t => {
                return new Identifier(t.id);
            });
    }

}