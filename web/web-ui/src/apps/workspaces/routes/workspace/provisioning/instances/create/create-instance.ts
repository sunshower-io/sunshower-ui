import {bindable} from "aurelia-framework";
/**
 * Created by dustinlish on 3/5/17.
 */

export class CreateInstance {

    formPath = "apps/workspaces/routes/workspace/provisioning/instances/create/forms";

    @bindable
    viewModels = [
        `${this.formPath}/instance-type-form`,
        `${this.formPath}/instance-details-form`,
        `${this.formPath}/app-customize-form`,
        `${this.formPath}/summary-form`
    ];

    @bindable modal;

    show() {
        $('.multi-step-form')
            .modal('show');
    }

    cancel() {
        $('.multi-step-form')
            .modal('hide');
    }

    complete() {
        console.log("do something");
        this.cancel();
    }

}