import {autoinject} from 'aurelia-framework';

import {
    Router,
    RouterConfiguration
} from 'aurelia-router';


import {NavigatorManager} from 'apps/workspaces/resources/custom-elements/navigator';

@autoinject
export class WorkspaceContext {

    /**
     *
     * @param navigatorManager
     */
    constructor(private navigatorManager: NavigatorManager) {

    }


    configureRouter(config: RouterConfiguration,
                    router: Router) {
        config.map([{
            route: 'dashboard',
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
            title: 'Infrastructure Designer',
            settings: {
                icon: 'mdi-apps',
                contextComponent: {
                    reference: 'apps/workspaces/routes/workspace/designer/context-menu'
                }
            }
        }]);
        this.navigatorManager.bind(router);
    }


}