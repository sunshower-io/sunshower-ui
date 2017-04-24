import {UUID} from "lib/common/lang";
import {Auth} from "apps/auth/auth";
import {Router} from "aurelia-router";
import {User} from "lib/common/security";

import {HttpClient} from 'aurelia-fetch-client';



import {bindable} from "aurelia-framework";
import {inject} from "aurelia-dependency-injection";

@inject(HttpClient, Auth, Router)
export class Signup {

    private firstnameId: string       =  UUID.random();
    private lastnameId: string       =  UUID.random();
    private usernameId: string       =  UUID.random();
    private emailId: string       =  UUID.random();
    private passwordId: string       =  UUID.random();
    private confirmId: string       =  UUID.random();


    @bindable
    private user: User = new User();

    @bindable
    private showError:boolean = false;

    constructor(
        private client: HttpClient,
        private auth: Auth,
        private router:Router
    ) {
    }

    signup(): void {
        this.client.fetch('signup/signup', {
            method: 'post',
            body: JSON.stringify(this.user)
        }).then(response => response.json())
        .then(data => {
            this.signIn();
        }).catch(er => {
            console.log("ERROR", er);
            this.showError = true;
        });
    }

    signIn() : void {
        this.router.navigateToRoute('login')
    }

}