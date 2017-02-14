import {Clouds} from "./clouds";
import {
    bindable,
    inject,
    customElement
} from "aurelia-framework";
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
@customElement('add-cloud')
export class AddCloud {

    @bindable
    visible: boolean;

    @bindable
    providerSelected :boolean;

    @bindable
    providers: Provider[];

    constructor(private client:HttpClient) {
        this.providers = [];
        let aws = new Provider,
            vmware = new Provider;
        aws.logo = 'styles/themes/hasli/assets/images/logos/aws-logo.svg';
        aws.name = 'AWS';
        vmware.logo = 'styles/themes/hasli/assets/images/logos/vmware-logo.png';
        vmware.name = 'VMWare';
        this.providers.push(aws);
        this.providers.push(vmware);
    }

    attached(): void {
    }

    selectProvider(provider:Provider) : void {
        this.providerSelected = true;
    }

    saveCredential() : void {
        this.providerSelected = false;
        //todo refresh clouds
        this.close();
    }

    open() : void {
        this.providerSelected = false;
        this.visible = true;

    }

    close() : void {
        this.visible = false;
    }

}

//leaving this here so Josiah can put it wherever
export class Provider {
    logo    ?: string;
    name    ?: string;
}