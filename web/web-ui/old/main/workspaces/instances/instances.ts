import {
    bindable,
    inject
} from "aurelia-framework";

import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Instances {

    @bindable
    instances: Instance[];

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
            this.client.fetch('compute')
                .then(d => d.json() as any)
                .then(d => {
                    this.loading = false;
                    this.instances = d;
                });
        }, 2)
    }

}

//leaving this here so Josiah can put it wherever
export class Instance {
    logo    ?: string;
    name    ?: string;
    status  ?: string;
    ip      ?: string;
    ports   ?: string;
    cpu     ?: number;
    memory  ?: number;
    disk    ?: number;
}