import {bindable, inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {User} from "../../../model/core/security/user";
import {CredentialSecret, Secrets} from "../../../model/core/secret/credentials";


@inject(HttpClient, User)
export class Credentials {


    private credentials = [];

    @bindable
    private newCredential = false;

    @bindable
    private secret:CredentialSecret;

    constructor(
        private client:HttpClient,
        private user:User
    ) {

    }

    attached() {
        this.fetch();
    }

    fetch() {
        this.client.fetch(`secrets/vault/${Secrets.Credential}/list`)
            .then(response => response.json())
            .then(r => {
                console.log("test", r);
                this.credentials = r;
                this.newCredential = false;
            });

    }

    addCredential() {
        this.newCredential = true;
        this.secret = new CredentialSecret();
        this.secret.user = this.user;
    }

    saveCredential() {
        console.log(this.client.defaults.headers);
        this.client.fetch('secrets/vault', {
            method:'post',
            body:JSON.stringify(this.secret)
        })
        .then(response => response.json())
        .then(data => {
            this.fetch();
        });

    }
}