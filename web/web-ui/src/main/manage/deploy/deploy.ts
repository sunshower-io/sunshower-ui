
import {inject, bindable} from "aurelia-framework";

import {NodeConfiguration, OperatingSystem} from "../../../model/hal/api";
import {HttpClient} from "aurelia-fetch-client";
import {
    Secrets,
    CredentialSecret
} from "../../../model/core/secret/credentials";


class DeploymentRequest {

    public key:string;

    public credential:string;

    public instanceType:string;
}

@inject(HttpClient)
export class Deploy {

    @bindable
    private configurations:NodeConfiguration[];

    @bindable
    private credentials:CredentialSecret[];

    @bindable
    private toDeploy:NodeConfiguration;

    @bindable
    private showDeploymentPanel:boolean;

    @bindable
    private selectOsVisible:boolean;

    @bindable
    private selectCredentialVisible:boolean;

    @bindable
    private matchingConfigurations:NodeConfiguration[];


    @bindable
    private submitVisible:boolean;

    private operatingSystems:OperatingSystem[];

    constructor(private client:HttpClient) {
        this.operatingSystems = [];
        this.operatingSystems.push(
            new OperatingSystem("Windows 10")
        );
        this.operatingSystems.push(
            new OperatingSystem("Debian")
        );

    }

    createDeploymentRequest() : DeploymentRequest {
        return new DeploymentRequest();
    }

    deploy() : void {
        this.client.fetch('hal/deploy/aws', {
            method:'post',
            body: JSON.stringify(this.createDeploymentRequest())
        }).then(data => data.json())
            .then(data => {
                console.log("Got one");
            });
    }
    selectCredential() : void {
        this.submitVisible = true;
    }

    showAvailableCredentials() : void {

        this.client.fetch(`secrets/vault/${Secrets.Credential}/list`)
            .then(response => response.json())
            .then(r => {
                console.log("test", r);
                this.credentials = r;
                this.selectCredentialVisible = true;
            });

    }

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

    searchInstances(id:string) : void{
        this.client.fetch(`search/compute/${id}`)
            .then(response => response.json())
            .then(descriptors => {
                console.log(descriptors);
                this.matchingConfigurations = descriptors
            });
    }

    showDeployment(cfg:NodeConfiguration) {
        this.showDeploymentPanel = true;
        this.toDeploy = cfg;
    }

    showOperatingSystems() : void {
        this.selectOsVisible = true;
    }

}