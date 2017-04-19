import {autoinject} from 'aurelia-framework';
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace/service";

@autoinject
export class WorkspacesOverview {

    constructor(private workspaceService:WorkspaceService) {

    }

    attached() : void {
        this.workspaceService.list().then(t => console.log(t));
    }

}