
import {inject, bindable} from "aurelia-framework"

import {
    NodeConfiguration,
    MemoryProfile,
    ComputeProfile,
    StorageProfile
} from "../../../model/hal/api"

import {HttpClient} from "aurelia-fetch-client";

@inject(HttpClient)
export class Nodeconfigs {

    @bindable
    private formShowing:boolean;

    @bindable
    private configuration:NodeConfiguration;

    @bindable
    private storageProfile:StorageProfile;

    @bindable
    private computeProfile:ComputeProfile;

    @bindable
    private memoryProfile:MemoryProfile;

    @bindable
    private configurations:NodeConfiguration[];

    constructor(private client:HttpClient) {

    }

    attached () {
        console.log("Cool");
        this.list();
    }

    list() : void {
        this.client.fetch("hal/nodes/configuration")
            .then(response => response.json())
            .then(d => {
                this.configurations = d;
            })
    }

    saveConfiguration() : void {
        this.client.fetch('hal/nodes/configuration', {
            method: 'post',
            body:JSON.stringify(this.configuration)
        }).then(response => response.json())
            .then(data => {
                this.list();
            })
    }

    addConfiguration() : void {
        this.configuration = new NodeConfiguration();
        this.storageProfile = new StorageProfile;
        this.storageProfile.capacity = 500;
        this.computeProfile = new ComputeProfile;
        this.computeProfile.cores = 1;
        this.memoryProfile = new MemoryProfile;
        this.memoryProfile.capacity = 500;

        this.configuration.memoryProfile = this.memoryProfile;
        this.configuration.computeProfile = this.computeProfile;
        this.configuration.storageProfile = this.storageProfile;

        this.formShowing = true;
    }
}