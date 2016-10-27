import {Application} from '../model/core/application';
import {User} from '../model/core/security/index';
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";


@inject(HttpClient)
export class Initialize {


    constructor(private client:HttpClient) {

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
        let payload = {
            application:this.application
        };
        console.log("GOT", JSON.stringify(payload));
        this.client.fetch('initialize', {
            method:'post',
            body: JSON.stringify(this.application)
        }).then(data => data.json())
            .then(data => {
            });

    }
}