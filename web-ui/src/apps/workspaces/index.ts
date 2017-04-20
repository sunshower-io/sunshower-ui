import {autoinject} from "aurelia-framework";

import {
    NavigatorManager
} from 'apps/workspaces/resources/custom-elements/navigator'


import {
    Router,
    RouterConfiguration
} from "aurelia-router";

@autoinject
export class WorkspaceApplication {

    constructor(private navigatorManager: NavigatorManager) {


    }


    public configureRouter(cfg: RouterConfiguration,
                           router: Router): void {

        cfg.map([{
            route: ['', 'list'],
            moduleId: './routes/workspaces',
            title: 'Workspaces'


        }, {
                route: ':workspaceId',
                moduleId: './routes/workspace/index',
                title: 'Workspace'
            }
        ]);


        this.navigatorManager.bind(router);

    }


}