import {OperatingSystem} from '../../../model/hal/api';
import {HttpClient} from "aurelia-fetch-client";
import {User} from '../../../model/core/security/user';
import {CredentialSecret, Secrets} from "../../../model/core/secret/credentials";
import {bindable, inject} from 'aurelia-framework'

@inject(User)
export class NodeConfigurations {

    private credentials = [];

    @bindable
    private newCredential = false;

    @bindable
    private secret:CredentialSecret;

    @bindable
    private operatingSystems: Array <OperatingSystem>;

    constructor (private client:HttpClient, private user:User) {
        this.operatingSystems = [];
        this.operatingSystems.push(new OperatingSystem("Windows", "windows", 'this is a description of the Windows OS'));
        this.operatingSystems.push(new OperatingSystem("Linux", "linux", 'this is a description of the Linux OS'));
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