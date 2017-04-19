import {autoinject} from "aurelia-framework";

import {
    NavigatorManager
} from 'apps/workspaces/resources/custom-elements/navigator'


import {
    Router,
    RouterConfiguration
} from "aurelia-router";
import {ServiceManager} from "../../lib/common/service/service-manager";

@autoinject
export class WorkspaceApplication {

    constructor(private navigatorManager: NavigatorManager, serviceManager: ServiceManager) {


    }


    public configureRouter(cfg: RouterConfiguration,
                           router: Router): void {

        cfg.map([{
            route: ['', 'list'],
            moduleId: './routes/workspaces'


        }, {
                route: ':workspaceId',
                moduleId: './routes/workspace/index'
            }
        ]);


        this.navigatorManager.bind(router);

    }


}