import {
    bindable,
    inject,
    customElement
} from "aurelia-framework";
import {HttpClient} from 'aurelia-fetch-client';
import {Provider} from "common/model/api/hal/api";

@inject(HttpClient)
@customElement('add-cloud')
export class AddCloud {

    @bindable
    visible: boolean;

    @bindable
    providerSelected :boolean;

    @bindable
    providers: Provider[];

    @bindable
    private provider:Provider;

    constructor(private client:HttpClient) {
        this.providers = [];
        let aws = new Provider,
            vmware = new Provider;
        aws.icon = 'styles/themes/hasli/assets/images/logos/aws-logo.svg';
        aws.name = 'AWS';
        vmware.icon = 'styles/themes/hasli/assets/images/logos/vmware-logo.png';
        vmware.name = 'VMWare';
        this.providers.push(aws);
        this.providers.push(vmware);
    }

    attached(): void {
    }

    saveProvider() : void {
        this.client.fetch('provider', {
            method: 'post',
            body: JSON.stringify(this.provider)
        }).then(t => this.close());
    }

    // refresh() : void {
    //     this.client.fetch('provider')
    //         .then(r => r.json() as any)
    //         .then(r => this.providers = r);
    // }




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

