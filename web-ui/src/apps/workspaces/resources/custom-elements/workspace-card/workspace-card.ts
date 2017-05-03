import {bindable, customElement, autoinject} from "aurelia-framework";
import {Workspace, WorkspaceService} from "apps/workspaces/lib/model/core/workspace";
import {Router} from "aurelia-router";
import {EventAggregator} from "aurelia-event-aggregator";
import {WorkspaceEvents} from "../events";

@customElement('workspace-card')
@autoinject
export class WorkspaceCard {

    @bindable
    private workspace: Workspace;

    constructor(private router: Router, private workspaceService: WorkspaceService, private ea:EventAggregator) {

    }

    activate(router: Router) {
        this.router = router;


    }

    open(id:string) : void {
        this.router.navigate(`${id}/dashboard`);
    }

    destroy(id: string) : void {
        this.workspaceService.destroy(id)
            .then(t => t.json as any)
            .then(t => {
                this.ea.publish(WorkspaceEvents.DELETED, {});
            });
    }

}