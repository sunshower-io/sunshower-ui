import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from "aurelia-dependency-injection";
import {bindable} from "aurelia-framework";
import {User} from "../model/core/security/index";
import {Router} from "aurelia-router";


@inject(HttpClient, Router)
export class Signup {




    @bindable
    private user:User = new User();

    constructor(
        private client:HttpClient,
        private router:Router) {
    }


    submit() : void {
        this.client.fetch('signup/signup', {
            method: 'post',
            body: JSON.stringify(this.user)
        }).then(response => response.json())
            .then(data => {
                this.router.navigate('home');
            });
    }



}