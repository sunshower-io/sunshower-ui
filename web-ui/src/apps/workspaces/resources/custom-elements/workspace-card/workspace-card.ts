import {bindable, customElement, autoinject} from "aurelia-framework";
import {Workspace} from "apps/workspaces/lib/model/core/workspace";
import {Router} from "aurelia-router";

@customElement('workspace-card')
@autoinject
export class WorkspaceCard {

    @bindable
    private workspace: Workspace;

    constructor(private router: Router) {

    }

    activate(router: Router) {
        this.router = router;
    }

    open(id:string) : void {
        this.router.navigate(`${id}/dashboard`);
    }

}