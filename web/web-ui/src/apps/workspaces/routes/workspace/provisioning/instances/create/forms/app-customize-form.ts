import {CreateInstanceWizard} from "../../wizard/wizard";
import {autoinject, bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {ComputeTemplate} from "common/model/api/hal/compute";

@autoinject
export class AppCustomizeForm {

    singleInstancePolicy: HTMLElement;

    policies: ComputeTemplate[];

    applications: {name: string, id: string, logo: string}[]; //todo make this a real thing

    @bindable
    policyID: string = '';


    constructor(private client:HttpClient, private wizard:CreateInstanceWizard) {
        this.wizard.policyId = this.policyID;
    }

    attached() {
        $('.ui.accordion')
            .accordion({
                exclusive: false
            });

        $('.ui.checkbox')
            .checkbox();

        $('.menu .item')
            .tab()
        ;

        this.client.fetch('compute')
            .then(t => t.json() as any)
            .then(t => {
                this.policies = t;
            });
    }

}