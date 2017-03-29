import {
    bindable,
    inject,
    NewInstance
} from "aurelia-framework";
import {HttpClient} from 'aurelia-fetch-client';
import {Provider, AWSRegion} from "common/model/api/hal/api";
import {
    ValidationController,
    ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from 'common/resources/custom-components/bootstrap-form-renderer';
import {Credential} from "common/model/security/credentials";
import {Workspace} from "apps/workspaces/routes/workspace/index";
@inject(Workspace, HttpClient, NewInstance.of(ValidationController))
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
                private client: HttpClient,
                private controller: ValidationController) {
        this.controller.addRenderer(new BootstrapFormRenderer());

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
        this.setupValidation();
    }

    saveProvider(): void {
        this.controller.validate().then(result => {
            if (result.valid) {
                this.loading = true;
                this.client.fetch('providers', {
                    method: 'post',
                    body: JSON.stringify(this.provider)
                }).then(t => t.json() as any).then(t => {
                    this.loading = false;
                    this.client.fetch(`providers/${this.provider.id}/credential`, {
                        method: 'post',
                        body: JSON.stringify(this.credential)
                    }).then(t => {
                        this.close();
                    });

                    this.client.fetch(`compute/${t.value}/provider/index`, {
                        method: 'put'
                    }).then(u => {
                            console.log("Indexing provider");
                    });
                });
            }
        });
    }

    setupValidation(): void {
        //            .ensure((p:Provider) => p.key).required().satisfies(p => p.length === 3)
        //.withMessage('Key must be exactly three characters long')
        //.ensure((p: Provider) => p.awsRegion).required().when((p: Provider) => p.key == 'aws').withMessage('A region is required for AWS clouds.')
        let validationRules = ValidationRules
            .ensure((p: Provider) => p.name).required()
            .rules;
        this.controller.addObject(this.provider, validationRules);
        let credentialRules = ValidationRules
            .ensure((c: Credential) => c.name).required().minLength(3)
            .ensure((c: Credential) => c.credential).required().minLength(3)
            .ensure((c: Credential) => c.secret).required().minLength(3)
            .rules;
        this.controller.addObject(this.credential, credentialRules);
    }

    open(): void {
        this.providerSelected = false;
        this.visible = true;

    }

    close(): void {
        this.parent.router.navigateBack();
    }

}

