
import {HttpClient} from 'aurelia-fetch-client';
import {bindable, inject} from "aurelia-framework";
@inject(HttpClient)
export class Applications {

    @bindable
    applications: Application[];

    @bindable
    loading: boolean;

    constructor(private client:HttpClient) {
    }

    attached(): void {
        this.refresh();
    };

    refresh(): void {
        this.loading = true;
        setTimeout(() => {
            this.client.fetch('applications')
                .then(d => d.json() as any)
                .then(d => {
                    this.loading = false;
                    this.applications = d;
                });
        }, 2)
    }

}

export class Application {
    logo    ?: string;
    name    ?: string;
    status  ?: string;
    ip      ?: string;
    ports   ?: string;
    cpu     ?: number;
    memory  ?: number;
    disk    ?: number;
}