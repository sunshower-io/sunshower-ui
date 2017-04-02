
import {HttpClient} from "aurelia-fetch-client";
import {
    HttpClient as HttpBasicClient
} from 'aurelia-http-client';


import {Application} from './application';
import {Identifier} from "common/lib/lang";
import {autoinject} from "aurelia-dependency-injection";
import {Service, ServiceManager} from "common/model/service";
import {ConstraintViolationException} from "common/model/service";



export class Workspace {
    public id: string;
    constructor(data:any) {
        Object.assign(this, data);
    }
}

export class SaveWorkspaceRequest {
    key         : string;
    name        : string;
    file        : File;

    bindFiles(files:FileList) {
        if(files && files.length) {
            this.file = files[0];
        }
    }


    toFormData() : FormData {
        let formData = new FormData();
        formData.append('name', this.name || '');
        formData.append('key', this.key || this.name || '');
        return formData;
    }

    imageToFormData() : FormData {
        if(this.file) {
            let formData = new FormData(),
                file = this.file;
            formData.append('file-data', file);
            formData.append('image-name', file.name);
            formData.append('image-type', file.type);
            return formData;
        }
        return null;


    }


}

@autoinject
export class WorkspaceService implements Service<Workspace> {

    public workspace:Workspace;

    constructor(
        private client:HttpClient,
        private httpClient: HttpBasicClient,
        private serviceManager: ServiceManager
    ) {
        serviceManager.register('workspaceId', this);
    }


    public save(workspaceRequest: SaveWorkspaceRequest) : Promise<Workspace> {
        return this.httpClient
            .createRequest('workspaces')
            .asPut()
            .withHeader('accept', 'application/json')
            .withContent(workspaceRequest.toFormData())
            .skipContentProcessing()
            .send()
            .then(t => {
                if(!t.isSuccess) {
                    throw new ConstraintViolationException(t.content);
                } else {
                    return t;
                }
            })
            .then(t => t.content as any)
            .then(t => {
                this.workspace = new Workspace(t);
                let file = workspaceRequest.imageToFormData();
                if(file) {
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


    getApplications() : Promise<Application[]> {

        return this.client.fetch(`workspaces/${this.workspace.id}/applications`)
            .then(t => t.json() as any)
            .then(t => t.map(u => new Application(u)));

    }


    list() : Promise<Workspace[]> {
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


