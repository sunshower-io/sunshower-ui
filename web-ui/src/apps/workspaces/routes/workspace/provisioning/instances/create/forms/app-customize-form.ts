import {CreateInstanceWizard} from "../../wizard/wizard";
import {autoinject, bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {ComputeTemplate} from "common/model/api/hal/compute";
import {Application} from "common/model/api/core/application";



@autoinject
export class AppCustomizeForm {

    singleInstancePolicy: HTMLElement;

    policies: ComputeTemplate[];

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

        $('.ui.modal').modal('refresh');

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