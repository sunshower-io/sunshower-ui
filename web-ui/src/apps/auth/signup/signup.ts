import {UUID} from "lib/common/lang";
import {Auth} from "apps/auth/auth";
import {Router} from "aurelia-router";
import {User} from "lib/common/security";

import {HttpClient} from 'aurelia-fetch-client';
import {bindable} from "aurelia-framework";
import {inject} from "aurelia-dependency-injection";

@inject(HttpClient, Auth, Router)
export class Signup {

    private firstnameId: string      =  UUID.random();
    private lastnameId: string       =  UUID.random();
    private usernameId: string       =  UUID.random();
    private emailId: string          =  UUID.random();
    private phoneId: string          = UUID.random();
    private passwordId: string       =  UUID.random();
    private confirmId: string        =  UUID.random();

    private password: HTMLElement;
    private confirmPassword: HTMLElement;


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
        if ($(this.password).val() == $(this.confirmPassword).val()) {
            this.client.fetch('signup/signup', {
                method: 'post',
                body: JSON.stringify(this.user)
            }).then(response => response.json())
                .then(data => {
                    //todo redirect with message
                    this.signIn();
                }).catch(er => {
                console.log("ERROR", er);
                this.showError = true;
            });
        } else {
            //todo return error
            this.showError = true;
        }
    }

    signIn() : void {
        this.router.navigateToRoute('login')
    }

}