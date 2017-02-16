import {
    bindable,
    inject,
    customElement,
    NewInstance
} from "aurelia-framework";
import {HttpClient} from 'aurelia-fetch-client';
import {Provider} from "common/model/api/hal/api";
import {
    ValidationController,
    ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from 'common/resources/custom-components/bootstrap-form-renderer';

@inject(HttpClient, NewInstance.of(ValidationController))
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



    constructor(private client:HttpClient, private controller:ValidationController) {
        this.controller.addRenderer(new BootstrapFormRenderer());

        this.providers = [];
        let aws = new Provider,
            vmware = new Provider;
        aws.icon = 'styles/themes/hasli/assets/images/logos/aws-logo.svg';
        aws.name = 'AWS';
        aws.key = 'AWS'; //key has to be 3 chars long
        vmware.icon = 'styles/themes/hasli/assets/images/logos/vmware-logo.png';
        vmware.name = 'VMWare';
        vmware.key = 'VMW';
        this.providers.push(aws);
        this.providers.push(vmware);
    }

    attached(): void {
    }

    selectProvider(provider:Provider) : void {
        this.providerSelected = true;
        this.provider = provider;
        this.setupValidation();
    }

    saveProvider() : void {

        this.controller.validate().then(result => {
            if (result.valid) {
                this.client.fetch('provider', {
                    method: 'post',
                    body: JSON.stringify(this.provider)
                }).then(t => this.close());
            }
        });
    }

    setupValidation() : void {
        //            .ensure((p:Provider) => p.key).required().satisfies(p => p.length === 3)
        //.withMessage('Key must be exactly three characters long')
        let validationRules = ValidationRules
            .ensure((p:Provider) => p.name).required()
            .rules;
        this.controller.addObject(this.provider, validationRules);
    }

    open() : void {
        this.providerSelected = false;
        this.visible = true;
    }

    close() : void {
        this.visible = false;
    }

}