

import {
    bindable,
    inject
} from "aurelia-framework";
import * as _ from 'lodash';
import {json, HttpClient} from "aurelia-fetch-client";
import {Credential} from "common/model/security/credentials";
import Deployment from "apps/workspaces/model/deployment/deployment";
import {DraftboardManager} from "apps/workspaces/services/draftboard/draftboard";
import {InfrastructureNode} from "apps/workspaces/model/components/infrastructure-node";
import {DeploymentMarshaller} from "apps/workspaces/model/deployment/deployment-marshaller";

@inject(HttpClient, DraftboardManager)
export class DeployDialog {

    @bindable
    private node                : InfrastructureNode;

    private loading             : boolean = true;

    private credential          : Credential;

    private addingCredential    : boolean = false;
    private credentials         : Credential[];

    private dropdown:HTMLElement;


    constructor(
        private client:HttpClient,
        private draftboardManager: DraftboardManager
    ) {

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


    deploy() : void {
        let credential = this.credential,
            draftboard = this.draftboardManager.focusedDraftboard(),
            deployment = new Deployment(draftboard, credential),
            body = JSON.stringify(new DeploymentMarshaller().write(deployment));
        console.log(body)
        this.client.fetch('deployment', {
            method: 'post',
            body: body,
        }).then(data => {
            alert("Deploying!");
        });

    }


    credentialChanged = (value:string, text:any, item:any) => {
        this.credential = _.find(this.credentials, t => t.id === value)
    };


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
                    $(this.dropdown).dropdown({
                        action: 'activate',
                        onChange: this.credentialChanged
                    });
                });
            });
    }

    activate() : void {
        this.listCredentials();
    }

}