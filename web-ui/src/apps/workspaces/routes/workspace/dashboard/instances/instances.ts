import {autoinject, bindable} from "aurelia-framework";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace";
import {NavigationAware} from "apps/workspaces/resources/custom-elements/navigator";

@autoinject
@NavigationAware
export class WorkspaceDashboardInstances {

    @bindable
    private loading : boolean;

    private instances: any[];

    constructor(private workspaceService: WorkspaceService) {
    }

    attached() {
        this.loading = true;
        this.instances = [
            {
                name: 'Fake Instance',
                state: 'Released',
                nodes: '2',
                containers: '7',
                time: '7 days',
                version: '1.0.23'
            },
            {
                name: 'Another Fake Instance',
                state: 'Stopped',
                nodes: '2',
                containers: '7',
                time: '5 minutes',
                version: '1.0.23'
            }
        ];
        this.loading = false;
    }

}