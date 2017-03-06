import {bindable} from "aurelia-framework";
/**
 * Created by dustinlish on 3/5/17.
 */

export class UpdateInstance {

    formPath = "apps/workspaces/routes/workspace/provisioning/instances/update/forms";

    @bindable
    viewModels = [
        `${this.formPath}/version-form`,
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