import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from "aurelia-dependency-injection";
import {bindable} from "aurelia-framework";
import {User} from "../model/core/security/user";


@inject(HttpClient)
export class Signup {

    private client:HttpClient;

    @bindable
    private user:User = new User();

    constructor(client:HttpClient) {
        this.client = client;
    }



    submit() : void {
        this.client.fetch('signup/signup', {
            method: 'post',
            body: JSON.stringify(this.user)
        });
        console.log(JSON.stringify(this.user))
    }



}