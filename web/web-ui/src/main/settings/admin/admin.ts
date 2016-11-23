import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {User} from "../../../model/core/security";


@inject(HttpClient)
export class Admin {

    private pendingSignups:RegistrationRequest[];

    constructor(private client: HttpClient) {

    }


    public activateUser(id:string) : void {
        this.client.fetch(`signup/${id}/approve`, {
            method: 'post'
        }).then(response => response.json())
            .then(r => this.refresh())
    }

    private refresh() : void {
        this.client.fetch('signup/pending')
            .then(response => response.json())
            .then(r => {
                this.pendingSignups = r;
                console.log(this.pendingSignups[0].requestId);
            });
    }

    attached() {
        this.refresh();
    }

}

class RegistrationRequest {
    requestId:string;
    user:User
}

