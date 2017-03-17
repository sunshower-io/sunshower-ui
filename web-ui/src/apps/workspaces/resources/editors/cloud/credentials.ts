import {
    bindable,
    inject
} from "aurelia-framework";

import {HttpClient} from "aurelia-fetch-client";
import {json} from "aurelia-fetch-client";
import {CredentialSecret} from "common/model/security";
import {VirtualCloud} from "apps/workspaces/model/components/cloud";

@inject(HttpClient)
export class Credentials {

    @bindable
    private node                : VirtualCloud;

    private loading             : boolean = true;

    private credential          : CredentialSecret;

    private addingCredential    : boolean = false;
    private credentials         : CredentialSecret[];


    constructor(private client:HttpClient) {

    }

    addCredential() {
        this.addingCredential = true;
        this.credential = new CredentialSecret();
    }

    save() : void {
        this.client.fetch('secrets/vault', {
            method: 'post',
            body: json(this.credential)
        }).then(data => {
            this.listCredentials();
        });
    }


    attached() : void {
        this.loading = true;
        this.listCredentials();
    }

    private listCredentials() {
        this.client.fetch('secrets/vault/io.hasli.vault.api.secrets.CredentialSecret/list')
            .then(response => response.json() as any)
            .then(data => {
                this.credentials = data;
                setTimeout(() => {
                    this.loading = false;
                });
            });
    }

    activate(model:VirtualCloud) : void {
        this.node = model;
    }

}