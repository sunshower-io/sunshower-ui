import { inject, bindable } from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Approvals {

    approvals: any[];

    @bindable
    loading: boolean;

    roles = 'admin';

    constructor(private client: HttpClient) {
        this.approvals = [];
    }

    attached() {
        this.getPending();
    }

    getPending() : void {
        this.loading = true;
        this.client.fetch('signup/pending')
            .then(response => response.json() as any)
            .then(response => {
                this.approvals = response;
                this.loading = false;
            });
    }

    approve(requestId : string) : void {
        this.loading = true;
        this.client.fetch(`signup/${requestId}/approve`, {
            method: 'post'
        }).then(response => response.json() as any)
            .then(response => {
                this.getPending();
            })
    }



}