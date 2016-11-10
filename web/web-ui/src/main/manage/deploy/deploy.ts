
import {inject, bindable} from "aurelia-framework";

import {NodeConfiguration} from "../../../model/hal/api";
import {HttpClient} from "aurelia-fetch-client";


@inject(HttpClient)
export class Deploy {

    @bindable
    private configurations:NodeConfiguration[];

    @bindable
    private toDeploy:NodeConfiguration;

    @bindable
    private showDeploymentPanel:boolean;



    constructor(private client:HttpClient) {}

    attached() : void {
        this.client.fetch("hal/nodes/configuration")
            .then(response => response.json())
            .then(d => {
                this.configurations = d;
            })
    }

    openDeployment(id:string) : void {
        this.client.fetch(`hal/nodes/configuration/${id}`)
            .then(response => response.json())
            .then(deployingConfiguration => {
                this.showDeployment(deployingConfiguration);
            });
    }

    showDeployment(cfg:NodeConfiguration) {
        this.showDeploymentPanel = true;
        this.toDeploy = cfg;
    }

}