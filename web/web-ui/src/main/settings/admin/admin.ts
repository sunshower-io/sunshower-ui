import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {User} from "../../../model/core/security";
import {bindable} from "aurelia-framework";


@inject(HttpClient)
export class Admin {

    private pendingSignups:RegistrationRequest[];

    @bindable
    private indexingImages:boolean;

    @bindable
    private indexingAWS:boolean;


    constructor(private client: HttpClient) {

    }

    indexImages() : void {
        this.indexingImages = true;
        this.client.fetch('docker/images/index', {
             method: 'get'
         }).then(response => response.json() as any)
             .then(r =>
                 this.indexingImages = false
             );
    }

    indexAWS() : void {
         this.indexingAWS = true;
         this.client.fetch('storage/s3/images', {
             method: 'get'
         }).then(response => response.json() as any)
             .then(r =>
                 this.indexingAWS = false
             );
    }

    public activateUser(id:string) : void {
        this.client.fetch(`signup/${id}/approve`, {
            method: 'post'
        }).then(response => response.json() as any)
            .then(r => this.refresh())
    }

    private refresh() : void {
        this.client.fetch('signup/pending')
            .then(response => response.json() as any)
            .then(r => {
                this.pendingSignups = r;
                //console.log(this.pendingSignups[0].requestId);
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

