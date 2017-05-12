import {autoinject} from "aurelia-framework";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace";

@autoinject
export class WorkspaceDashboardInstances {

    private instances: any[];

    constructor(private workspaceService:WorkspaceService) {
        this.instances = [
            {name: 'Fake Instance', state: 'Released', nodes: '2', containers: '7', time: '7 days', version: '1.0.23'},
            {name: 'Another Fake Instance', state: 'Stopped', nodes: '2', containers: '7', time: '5 minutes', version: '1.0.23'}
        ];
    }

}