
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
                icon: 'mdi-view-dashboard'
            }
        }]);
        this.navigatorManager.bind(router);



        //applications: mdi-code-tags
        //infrastructure: mdi-cloud
        //provisioning: mdi-cube-send
        //designer: mdi-android-studio
    }




}