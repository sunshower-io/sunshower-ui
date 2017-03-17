import {Application} from "common/model/api/core/application";
import {CreateInstanceWizard} from "../../wizard/wizard";
import {autoinject} from "aurelia-framework";

@autoinject
export class SummaryForm {

    private model: any;

    constructor(private wizard:CreateInstanceWizard) {

    }

    attached() {
        console.log(this.wizard)
    }

    activate(model) {
        this.model = model;
    }

}