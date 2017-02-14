

import {autoinject} from "aurelia-framework";
import {Workspaces} from "apps/workspaces/routes/workspace/index";
@autoinject
export class NewInstance {

    constructor(private parent:Workspaces) {

    }

    activate() : void {
        this.parent.setMenuVisible(false);
    }

    close() : void {
        this.parent.router.navigateBack();
    }
}