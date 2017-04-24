import {bindable, inject, NewInstance} from "aurelia-framework";
import {Provider, AWSRegion} from "common/model/api/hal/api";
import {Credential} from "common/model/security/credentials";
import {HttpClient} from "aurelia-fetch-client";
import {
    ValidationController,
    ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from 'common/resources/custom-components/bootstrap-form-renderer';

@inject(HttpClient, NewInstance.of(ValidationController))
export class Admin {

    @bindable
    loading:            boolean;

    @bindable
    providers:          Provider[];

    @bindable
    provider:           Provider;

    @bindable
    addingProvider:     boolean;

    @bindable
    addingCredential:   boolean;

    @bindable
    regions:            AWSRegion[];

    @bindable
    region:             HTMLElement;

    @bindable
    credential:         Credential;


    constructor(private client: HttpClient, private controller:ValidationController) {
        this.controller.addRenderer(new BootstrapFormRenderer());
    }

    attached() : void {
        this.refresh();
    }

    refresh(): void {
        this.loading = true;
        this.client.fetch('providers')
            .then(r => r.json() as any)
            .then(r => {
                this.providers = r;
                this.loading = false;
            });
    }

    addCloud() : void {
        //this.providerValidation();
        this.addingProvider = true;
        this.provider = new Provider;
        this.provider.icon = 'styles/themes/hasli/assets/images/logos/aws-logo.svg';
        this.provider.name = 'AWS';
        this.provider.key = 'aws';
        this.regions = AWSRegion.get();
        setTimeout(() => {
            $(this.region).dropdown();
        });
    }

    saveProvider() : void {
        //this.controller.validate().then(result => {
        //    if (result.valid) {
                this.client.fetch('providers', {
                    method: 'post',
                    body: JSON.stringify(this.provider)
                }).then(t => {
                    this.addingProvider = false;
                    this.addCredential(this.provider);
                });
        //    }
        //});
    }

    addCredential(provider: Provider) : void {
        //this.credentialValidation();
        this.addingCredential = true;
        this.provider = provider;
    }


    providerValidation() : void {
        let validationRules = ValidationRules
            .ensure((p:Provider) => p.name).required()
            .ensure((p:Provider) => p.awsRegion).required()
            .rules;
        //.when((p:Provider) => p.key == 'aws').withMessage('A region is required for AWS clouds.')
        this.controller.addObject(this.provider, validationRules);
    }

    credentialValidation() : void {
        ValidationRules.customRule(
            'atleastthreechars',
            (value, obj) => value === null || value === undefined || value.length > 2,
            `\${$displayName} must be at least three characters.`
        );
        let validationRules = ValidationRules
            .ensure((c:Credential) => c.name).required().satisfiesRule('atleastthreechars')
            .ensure((c:Credential) => c.credential).required().satisfiesRule('atleastthreechars')
            .ensure((c:Credential) => c.secret).required().satisfiesRule('atleastthreechars')
            .rules;
        this.controller.addObject(this.credential, validationRules);
    }

    saveCredential() : void {
        // this.controller.validate().then(result => {
        //     if (result.valid) {
                this.client.fetch(`provider/${this.provider.id}`, {
                    method: 'post',
                    body: JSON.stringify(this.credential)
                }).then(t => {
                    this.addingCredential = false;
                    this.refresh()
                });
        //     }
        // });
    }

}