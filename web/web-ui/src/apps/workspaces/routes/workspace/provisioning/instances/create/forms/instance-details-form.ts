import {CreateInstanceWizard} from "../../wizard/wizard";
import {autoinject, bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {Provider} from "common/model/api/hal/api";

@autoinject
export class DeployInfoForm {

    name: String;
    cloud: any;
    selectedTags: Array<String>;
    tagDropdown: any;

    providers: Provider[];

    @bindable
    providerID: string = '';


    constructor(private wizard:CreateInstanceWizard, private client:HttpClient) {
        this.selectedTags = [];
        this.wizard.providerId = this.providerID;
    }

    attached() {
        $(this.tagDropdown)
            .dropdown({
                allowAdditions: true
            });

        $(this.tagDropdown).on('change', (e) => {
            if (e.target.className !== 'search') {
                this.selectedTags = $(e.target).val().split(',');
                for (let tag of this.selectedTags) {
                    console.log(`Tags selected: ${tag}`)
                }
            }
        });

        this.client.fetch('providers')
            .then(r => r.json() as any)
            .then(r => {
                this.providers = r;
            })

    }

    detached() {
        $(this.tagDropdown)
            .dropdown('clear');
    }

}