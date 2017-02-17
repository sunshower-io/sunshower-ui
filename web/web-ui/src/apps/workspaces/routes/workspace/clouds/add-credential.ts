import {
    bindable,
    inject,
    NewInstance
} from "aurelia-framework";
import {Provider} from "common/model/api/hal/api";
import {CredentialSecret} from "common/model/security/credentials";
import {HttpClient} from "aurelia-fetch-client";
import {
    ValidationController,
    ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from 'common/resources/custom-components/bootstrap-form-renderer';
import {Workspaces} from "apps/workspaces/routes/workspace/index";

@inject(HttpClient, NewInstance.of(ValidationController))
export class AddCredential {


    @bindable
    private visible: boolean;

    @bindable
    private provider            :Provider;

    @bindable
    private credential          :CredentialSecret;

    @bindable
    private loading             : boolean;
    private providerId          : string;

    private credentials         : CredentialSecret[];

    constructor(private parent:Workspaces, private client:HttpClient, private controller:ValidationController) {
        this.controller.addRenderer(new BootstrapFormRenderer());

    }

    open(provider:Provider) : void {
        this.provider = provider;
        this.visible = true;
        this.credential = new CredentialSecret();
        this.setupValidation();
        this.refresh();
    }


    setupValidation() : void {
        ValidationRules.customRule(
            'atleastthreechars',
            (value, obj) => value === null || value === undefined || value.length > 2,
            `\${$displayName} must be at least three characters.`
        );
        let validationRules = ValidationRules
            .ensure((c:CredentialSecret) => c.name).required().satisfiesRule('atleastthreechars')
            .ensure((c:CredentialSecret) => c.credential).required().satisfiesRule('atleastthreechars')
            .ensure((c:CredentialSecret) => c.secret).required().satisfiesRule('atleastthreechars')
            .rules;
        this.controller.addObject(this.credential, validationRules);
    }

    attached() : void {
    }

    activate(params:any) : void {
        this.providerId = params.id;
        this.parent.setMenuVisible(false);
    }

    close() {
        this.parent.router.navigateBack();
    }

    saveCredential() : void {
        this.controller.validate().then(result => {
            if (result.valid) {
                console.log('it valid');
                this.client.fetch(`provider/${this.providerId}`, {
                    method: 'post',
                    body: JSON.stringify(this.credential)
                }).then(t => this.refresh());
            } else {
                console.log('it not valid');
            }
        });
    }


    refresh() : void {
        this.loading = true;
        this.client.fetch(`provider/${this.providerId}`)
            .then(r => r.json() as any)
            .then(r => {
                this.credentials = r;
                this.loading = false;
            });
    }


}