


import {bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-dependency-injection";
import {User} from "../model/core/security/user";


@inject(HttpClient)
export class Login {

    @bindable
    private user:User = new User();

    private client:HttpClient;


    constructor(client: HttpClient) {
        this.client = client;
    }

    submit() : void {
        this.client.fetch('authenticate/authenticate', {
            method: 'post',
            body: JSON.stringify(this.user)
        }).then(response => response.json())
            .then(data => {
                alert("logged in!" + data)
        })
    }


}