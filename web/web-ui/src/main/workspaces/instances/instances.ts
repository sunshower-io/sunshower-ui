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
        this.instances = [''];
        // this.client.fetch('compute')
        //     .then(d => d.json() as any)
        //     .then(d => {
        //         console.log(d);
        //         this.instances = d;
        //     });
        // this.instances = [
        //     {
        //         logo: 'http://i.crn.com/logos/ca_technologies.jpg',
        //         name: 'CA UIM Azure Probe',
        //         status: 'Running',
        //         ip: '10.238.0.2',
        //         ports: '8080',
        //         cpu: 40,
        //         memory: 40,
        //         disk: 40
        //     }
        //         ];
    };

    refresh(): void {
        this.loading = true;
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