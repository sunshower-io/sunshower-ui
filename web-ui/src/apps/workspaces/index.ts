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
        }, {
            route: 'approvals',
            moduleId: '../admin/approvals/approvals',
            name: 'approvals',
            title: 'Approvals'
        }
        ]);
        //todo move approvals route


        this.navigatorManager.bind(router);

    }


}