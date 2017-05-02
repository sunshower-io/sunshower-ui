import {autoinject} from 'aurelia-framework';

import {
    Router,
    RouterConfiguration
} from 'aurelia-router';


import {NavigatorManager} from 'apps/workspaces/resources/custom-elements/navigator';
import {WorkspaceService} from "../../lib/model/core/workspace/service";

@autoinject
export class WorkspaceContext {

    /**
     *
     * @param navigatorManager
     */
    constructor(
        private workspaceService: WorkspaceService,
        private navigatorManager: NavigatorManager,
        private router: Router
    ) {

    }

    activate(params: any) {
        (this.router as any).title = this.workspaceService.workspace.name;
    }


    configureRouter(config: RouterConfiguration,
                    router: Router) {
        config.map([{
            route: ['', 'dashboard'],
            moduleId: './dashboard/index',
            name: 'dashboard',
            nav: true,
            title: 'Dashboard',
            settings: {
                icon: 'mdi-web',
                contextComponent: {
                    reference: 'apps/workspaces/routes/workspace/dashboard/context-menu'
                }
            }
        }, {
            route: 'applications',
            moduleId: './applications/index',
            name: 'applications',
            nav: true,
            title: 'Applications',
            settings: {
                icon: 'mdi-apps',
                contextComponent: {
                    reference: 'apps/workspaces/routes/workspace/applications/context-menu'
                }
            }
        }, {
            route: 'infrastructure',
            moduleId: './infrastructure/index',
            name: 'infrastructure',
            nav: true,
            title: 'Infrastructure',
            settings: {
                icon: 'mdi-cloud-outline',
                contextComponent: {
                    reference: 'apps/workspaces/routes/workspace/infrastructure/context-menu'
                }
            }
        }]);
        this.navigatorManager.bind(router);
    }


}