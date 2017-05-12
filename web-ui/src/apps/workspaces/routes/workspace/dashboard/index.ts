import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace";

export class WorkspaceDashboard {

    private workspaceId: string;
    private instances: any[];

    constructor(private workspaceService:WorkspaceService) {
        this.workspaceId = this.workspaceService.workspace.id
        this.instances = [];
        this.instances.push({name: 'Fake Instance', state: 'Released', nodes: '2', containers: '7', time: '7 days', version: '1.0.23'});
        this.instances.push({name: 'Another Fake Instance', state: 'Stopped', nodes: '2', containers: '7', time: '5 minutes', version: '1.0.23'});
    }
}