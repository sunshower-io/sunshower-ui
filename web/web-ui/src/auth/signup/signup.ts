import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from "aurelia-dependency-injection";
import {bindable} from "aurelia-framework";
import {User} from "../../model/core/security/user";
import {Auth} from "../auth";

@inject(HttpClient, Auth)
export class Signup {

    private client: HttpClient;
    private auth: Auth;

    @bindable
    private user: User = new User();

    constructor(client: HttpClient, auth: Auth) {
        this.client = client;
        this.auth = auth;
    }

    signup(): void {
        this.auth.setAppRoot();
        this.client.fetch('signup/signup', {
            method: 'post',
            body: JSON.stringify(this.user)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }

}