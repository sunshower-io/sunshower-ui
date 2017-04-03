import {
    bindable,
    autoinject
} from "aurelia-framework";
import {HttpClient} from 'aurelia-fetch-client';
import {Provider} from "common/model/api/hal/api";
import {BootstrapFormRenderer} from 'common/resources/custom-components/bootstrap-form-renderer';
import {Credential} from "common/model/security/credentials";
import {Workspace} from "apps/workspaces/routes/workspace/index";

@autoinject
export class AddCloud {

    @bindable
    visible: boolean;

    @bindable
    loading: boolean;

    @bindable
    providerSelected: boolean;

    private credential: Credential;

    @bindable
    providers: Provider[];

    @bindable
    private provider: Provider;

    @bindable
    regions: any[];

    @bindable
    region: HTMLElement;


    constructor(private parent: Workspace,
                private client: HttpClient
    ) {

        //should be removed in favor of pulling in the real thing
        this.providers = [];
        let aws = new Provider,
            vmware = new Provider;
        aws.icon = 'styles/themes/hasli/assets/images/logos/aws-logo.svg';
        aws.name = 'AWS';
        aws.key = 'aws';
        vmware.icon = 'styles/themes/hasli/assets/images/logos/vmware-logo.png';
        vmware.name = 'VMWare';
        vmware.key = 'vmw';
        this.providers.push(aws);
        this.providers.push(vmware);
    }

    attached(): void {
    }

    activate(): void {
        this.parent.setMenuVisible(false);
    }

    deselectProvider() : void {
        this.providerSelected = false;
        this.provider = null;
        this.credential = new Credential;
    }

    selectProvider(provider: Provider): void {
        this.providerSelected = true;
        this.provider = provider;
        this.credential = new Credential;
        // if (this.provider.key == 'aws') {
        //     this.regions = AWSRegion.get();
        //     setTimeout(() => {
        //         $(this.region).dropdown();
        //     });
        // }
    }

    saveProvider(): void {
        // this.controller.validate().then(result => {
        //     if (result.valid) {
        //         this.loading = true;
        //         this.client.fetch('providers', {
        //             method: 'post',
        //             body: JSON.stringify(this.provider)
        //         }).then(t => t.json() as any).then(t => {
        //             this.loading = false;
        //             this.client.fetch(`providers/${this.provider.id}/credential`, {
        //                 method: 'post',
        //                 body: JSON.stringify(this.credential)
        //             }).then(t => {
        //                 this.close();
        //             });
        //
        //             this.client.fetch(`compute/${t.value}/provider/index`, {
        //                 method: 'put'
        //             }).then(u => {
        //                     console.log("Indexing provider");
        //             });
        //         });
        //     }
        // });
    }
    open(): void {
        this.providerSelected = false;
        this.visible = true;

    }

    close(): void {
        this.parent.router.navigateBack();
    }

}

