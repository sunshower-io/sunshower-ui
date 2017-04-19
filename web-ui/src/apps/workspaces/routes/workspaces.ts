import {
    autoinject,
    bindable
} from 'aurelia-framework';
import {
    Workspace,
    WorkspaceService
} from "apps/workspaces/lib/model/core/workspace";


@autoinject
export class WorkspacesOverview {

    @bindable
    private workspaces: Workspace[];
    constructor(private workspaceService:WorkspaceService) {

    }

    attached() : void {
        this.workspaceService.list().then(t => this.workspaces = t);
    }

}