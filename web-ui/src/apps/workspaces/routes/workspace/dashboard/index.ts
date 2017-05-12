import {autoinject} from "aurelia-framework";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace";
import {Router, RouterConfiguration} from "aurelia-router";

@autoinject
export class WorkspaceDashboard {


    constructor(private workspaceService:WorkspaceService,
                private router: Router) {

    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            {
                route: ['', 'dashboard'],
                moduleId: './dashboard/dashboard',
                name: 'dashboard',
                nav: true,
                title: 'Dashboard'
            },
            {
                route: 'instances',
                moduleId: './instances/instances',
                name: 'instances',
                nav: true,
                title: 'Instances',
                settings: {
                    badge: '2'
                }
            }
        ]);
        //todo make badge reflect # of instances
        //todo add route for creating new orchestration
    }
}