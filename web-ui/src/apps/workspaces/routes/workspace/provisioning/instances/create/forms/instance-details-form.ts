import {CreateInstanceWizard} from "../../wizard/wizard";
import {autoinject, bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {Provider} from "common/model/api/hal/api";

@autoinject
export class DeployInfoForm {

    cloud: any;
    tagDropdown: HTMLElement;

    providers: Provider[];

    @bindable
    providerID: string = '';


    constructor(private wizard:CreateInstanceWizard, private client:HttpClient) {
        this.wizard.selectedTags = [];
        this.wizard.providerId = this.providerID;
    }

    attached() {
        $(this.tagDropdown)
            .dropdown({
                allowAdditions: true
            });


        //todo fix bug that causes extra value selection
        $(this.tagDropdown).on('change', (e) => {
            if (e.target.className !== 'search') {
                this.wizard.selectedTags = $(e.target).val().split(','); //get this to work
                console.log('selectedTags', this.wizard.selectedTags);
            }
        });

        this.client.fetch('providers')
            .then(r => r.json() as any)
            .then(r => {
                this.providers = r;
            })

    }

}