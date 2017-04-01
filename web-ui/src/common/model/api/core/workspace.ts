import {autoinject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-fetch-client";
import {Service, ServiceManager} from "common/model/service";


export class Workspace {

    constructor(data:any) {
        Object.assign(this, data);
    }
}



@autoinject
export class WorkspaceService implements Service<Workspace> {

    public workspace:Workspace;

    constructor(private client:HttpClient, private serviceManager: ServiceManager) {
        serviceManager.register('workspaceId', this);
    }

    list() : Promise<Workspace[]> {
        return this.client.fetch('workspaces')
            .then(t => t.json() as any)
            .then(t => t.map(u => new Workspace(u)));
    }


    bind(key: string): Promise<Workspace> {
        if(key) {
            return this.client.fetch(`workspaces/${key}`)
                .then(t => t.json() as any)
                .then(t => {
                    this.workspace = new Workspace(t);
                    return this.workspace;
                });
        } else {
            return Promise.reject('no workspace with that id');
        }
    }

}