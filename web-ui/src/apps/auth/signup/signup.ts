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

    private passwordInput: HTMLInputElement;
    private confirmPasswordInput: HTMLInputElement;

    private password: string;
    private confirmPassword: string;
    private validationClass: string;

    @bindable
    private showError:boolean;

    @bindable
    private error: string;

    @bindable
    private showSuccess:boolean;


    @bindable
    private user: User = new User();


    constructor(
        private client: HttpClient,
        private auth: Auth,
        private router:Router
    ) {
    }

    signup(): void {
        this.showError = false;
        if (this.checkPasswords()) {
            this.user.password = this.password;

            this.client.fetch('signup/signup', {
                method: 'post',
                body: JSON.stringify(this.user)
            }).then(response => response.json())
                .then(data => this.showSuccess = true)
                .catch(er => {
                console.log("ERROR", er);
                this.showError = true;
                this.error = "Username or email already exists";
            });
        } else {
            this.showError = true;
            this.error = "Please enter and confirm a password"
        }
    }

    signIn() : void {
        this.router.navigateToRoute('login')
    }

    checkPasswords() : boolean {
        if (this.password == this.confirmPassword && this.password) {
            this.validationClass = 'valid';
            return true;
        } else if (this.password == '') {
            this.validationClass = '';
            return false;
        } else {
            this.validationClass = 'invalid';
            return false;
        }
    }

}