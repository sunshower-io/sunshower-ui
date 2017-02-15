import {inject} from "aurelia-dependency-injection";
import {bindable} from "aurelia-framework";
import {Auth} from "apps/auth/auth";
import {User} from "common/model/security";
import {Router} from "aurelia-router";

import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient, Auth, Router)
export class Signup {




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
            this.router.navigateToRoute('login');
        }).catch(er => {
            console.log("ERROR", er);
            this.showError = true;
        });
    }

}