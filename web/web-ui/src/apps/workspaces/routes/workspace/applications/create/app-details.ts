/**
 * Created by dustinlish on 2/19/17.
 */

import {Applications} from "apps/workspaces/routes/workspace/applications/applications";
import {autoinject} from "aurelia-framework";
import {customElement} from "aurelia-framework";

@autoinject
@customElement('create-app')
export class CreateApp {

    constructor(private parent:Applications) {
    }

    activate() {
    }

    create() : void {
        this.parent.parent.router.navigate("applications/4/application")
    }

    cancel() : void {
        this.parent.showModal = false;
    }

}
