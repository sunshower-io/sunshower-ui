import {Application} from '../model/core/application';
import {User} from '../model/core/security/index';
import {inject, Aurelia} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {Router} from "aurelia-router";


@inject(HttpClient, Aurelia, Router)
export class Initialize {


    constructor(
        private client:HttpClient,
        private aurelia:Aurelia,
        private router:any ) {

    }

    current:User;

    application:Application = new Application();



    addUser() {
        if(!this.application.administrators) {
            this.application.administrators = [];
        }
        this.current = new User();
        this.application.administrators.push(this.current);
    }

    submit() {
        this.aurelia.setRoot('app');
        this.client.fetch('initialize', {
            method:'post',
            body: JSON.stringify(this.application)
        }).then(data => data.json())
            .then(data => {
                window.location.reload();
            });

    }
}