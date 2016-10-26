


import {bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-dependency-injection";
import {TokenHolder, User, Token} from "../model/core/security/index";
import {Router} from "aurelia-router";




@inject(HttpClient, TokenHolder, Router)
export class Login {

    @bindable
    private user:User = new User();

    @bindable
    private remember:boolean;



    constructor(
        private client: HttpClient,
        private storage:TokenHolder,
        private router:Router
    ) {
        console.log("Storage", storage);

    }

    activate() : void {
        let token = this.storage.get();
        if(token) {
            this.client.fetch('authenticate/validate', {
                method:'post',
                body: JSON.stringify(new Token(token.token, null))
            }).then(response => response.json())
                .then(data => {
                    this.router.navigate('home');
                })
        }
    }

    submit() : void {
        this.client.fetch('authenticate/authenticate', {
            method: 'post',
            body: JSON.stringify(this.user)
        }).then(response => response.json())
            .then(data => {
                this.storage.set(data, this.remember);
                this.router.navigate('home');
                console.log("DONE");
        })
    }


}