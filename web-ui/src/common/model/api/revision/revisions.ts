import {autoinject} from "aurelia-framework";
import {Credential} from "common/model/security/credentials";
import {HttpClient} from "aurelia-fetch-client";
import {ApplicationTemplate, Application} from "common/model/api/core/application";

export enum RepositoryType {
    Workspace,
    Application
}


export class Repository {

    path: string;
    name: string;
    remote: Remote;
    type: RepositoryType;

}


export class Remote {

    constructor(value?: any) {
        Object.assign(this, value);
    }

    name: string;
    location: string;
    credential: Credential;

}


@autoinject()
export class RemoteService {

    constructor(private client: HttpClient) {

    }

    public save(workspaceId: string,
                applicationId: string,
                remote: Remote): Promise<ApplicationTemplate> {

        return this.client.fetch(this.url(workspaceId, applicationId, 'remote'), {
            method: 'put',
            body: JSON.stringify(this.cleanse(remote))
        })
            .then(t => {
                if (!t.ok) {
                    throw t.json() as any;
                }
                t.json() as any
            })
            .then(t => new Application(t));
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

    private url(workspaceId: string, applicationId: string, subpath?: string): string {
        if (subpath) {
            return `workspaces/${workspaceId}/applications/${applicationId}/${subpath}`
        }
        return `workspaces/${workspaceId}/applications/${applicationId}`
    }

}