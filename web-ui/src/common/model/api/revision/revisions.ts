import {autoinject} from "aurelia-framework";
import {Credential} from "common/model/security/credentials";
import {HttpClient} from "aurelia-fetch-client";
import {ApplicationTemplate, Application} from "common/model/api/application/model";

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


}