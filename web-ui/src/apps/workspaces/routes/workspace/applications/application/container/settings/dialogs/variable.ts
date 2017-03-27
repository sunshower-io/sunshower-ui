import {HttpClient} from "aurelia-fetch-client";
import {DialogController} from "aurelia-dialog";

/**
 * Created by dustinlish on 3/27/17.
 */

export class VariableDialog {

    private type : HTMLElement;
    private applicationId;

    constructor(private client: HttpClient,
                private dialogController: DialogController) {
    }

    activate(model) {
        this.applicationId = model.applicationId;
    }

    bind() {
        setTimeout(() => {
            $(this.type).dropdown();
        }, 700)
    }

    save() {
        this.close();
    }

    close() {
        this.dialogController.ok(this);
    }
}