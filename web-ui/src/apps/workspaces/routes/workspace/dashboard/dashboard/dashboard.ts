import {autoinject} from "aurelia-framework";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace";

@autoinject
export class WorkspaceDashboardCharts {

    constructor(private workspaceService:WorkspaceService) {

    }

}