import {bindable, autoinject} from "aurelia-framework";
import {Provider} from "common/model/api/hal/api";
import {CredentialSecret} from "common/model/security/credentials";
import {HttpClient} from "aurelia-fetch-client";
@autoinject
export class AddCredential {


    @bindable
    private visible: boolean;

    @bindable
    private provider:Provider;

    @bindable
    private credential:CredentialSecret;

    @bindable
    private loading: boolean;

    private credentials: CredentialSecret[];

    constructor(private client:HttpClient) {

    }

    open(provider:Provider) : void {
        this.provider = provider;
        this.visible = true;
        this.credential = new CredentialSecret();
        this.refresh();
    }

    attached() : void {
    }

    close() {
        this.visible = false;
    }

    saveCredential() : void {
        this.client.fetch(`provider/${this.provider.id}`, {
            method: 'post',
            body: JSON.stringify(this.credential)
        }).then(t => this.refresh());
    }


    refresh() : void {
        this.loading = true;
        this.client.fetch(`provider/${this.provider.id}`)
            .then(r => r.json() as any)
            .then(r => {
                this.credentials = r;
                this.loading = false;
            });
    }


}