/**
 * Created by dustinlish on 2/28/17.
 */

import {Workspace} from "apps/workspaces/routes/workspace/index";
import {autoinject} from "aurelia-dependency-injection";
import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";

@autoinject
export class Instance {

    public router: Router;

    constructor(private parent: Workspace) {
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            {route: ['', 'overview'], name: 'Overview', moduleId: './overview/overview', nav: true, title: 'Overview'},
            {route: 'activity', name: 'Activity', moduleId: './activity/activity', nav: true, title: 'Activity'},
            {route: 'console', name: 'Console', moduleId: './console/console', nav: true, title: 'Console'},
            {route: 'logs', name: 'Logs', moduleId: './logs/logs', nav: true, title: 'Logs'},
            {route: 'monitoring', name: 'Monitoring', moduleId: './monitoring/monitoring', nav: true, title: 'Monitoring'},
        ]);

        this.router = router;
    }

    close() : void {
        this.parent.router.navigate('provisioning');
    }


}