import {
    bindable,
    inject
} from "aurelia-framework";

import {HttpClient} from "aurelia-fetch-client";
import {json} from "aurelia-fetch-client";
import {Credential} from "common/model/security";
import {VirtualCloud} from "apps/workspaces/model/components/cloud";

@inject(HttpClient)
export class Credentials {

    @bindable
    private node                : VirtualCloud;

    private loading             : boolean = true;

    private credential          : Credential;

    private addingCredential    : boolean = false;
    private credentials         : Credential[];


    constructor(private client:HttpClient) {

    }

    addCredential() {
        this.addingCredential = true;
        this.credential = new Credential();
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
        this.client.fetch('secrets/vault/io.hasli.vault.api.secrets.Credential/list')
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