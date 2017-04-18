
import {autoinject} from 'aurelia-framework';

import {
    Router,
    RouterConfiguration
} from 'aurelia-router';


import {
    NavigatorManager,
    NavigationComponent
} from 'apps/workspaces/resources/custom-elements/navigator';

@autoinject
export class WorkspaceContext {

    /**
     *
     * @param navigatorManager
     */
    constructor(
        private navigatorManager: NavigatorManager
    ) {

    }


    configureRouter(
        config: RouterConfiguration,
        router:Router
    ) {
        config.map([{
            route: 'dashboard',
            moduleId: './dashboard/index',
            name: 'dashboard',
            nav: true,
            title: 'Dashboard',
            settings: {
                contextComponent: {
                    reference: '/apps/workspaces/routes/workspace/applications/context'
                }
            }
        }, {
            route: 'applications',
            moduleId: './applications/index',
            name: 'applications',
            title: 'Applications',
            settings: {
                contextComponent: {
                    reference: '/apps/workspaces/routes/workspace/applications/context'
                }
            }
        }]);
        this.navigatorManager.bind(router);
    }




}