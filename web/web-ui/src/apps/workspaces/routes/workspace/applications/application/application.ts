/**
 * Created by dustinlish on 2/20/17.
 */

import {Workspace} from "apps/workspaces/routes/workspace/index";
import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";

@autoinject
export class Application {

    public router: Router;

    constructor(private parent: Workspace) {
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            {route: ['', 'summary'], name: 'Summary', moduleId: './summary', nav: true, title: 'Summary'},
            {route: 'containers', name: 'Containers', moduleId: './containers', nav: true, title: 'Containers'},
            {route: 'versions', name: 'Versions', moduleId: './versions', nav: true, title: 'Versions'},
        ]);

        this.router = router;
    }


    close() : void {
        this.parent.router.navigateToRoute('applications');
    }
}
