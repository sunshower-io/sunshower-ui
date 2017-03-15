
import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";

export class Workspace {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspace';
        config.map([
            { route: ''            , redirect: 'dashboard'},
            { route: 'dashboard'   , name: 'dashboard'   , moduleId: 'main/workspaces/dashboard/dashboard'      , nav: true, title: 'Dashboard' },
            { route: 'applications', name: 'applications', moduleId: 'main/workspaces/applications/applications', nav: true, title: 'Applications' },
            { route: 'clouds'      , name: 'clouds'      , moduleId: 'main/workspaces/clouds/clouds'            , nav: true, title: 'Clouds' },
            { route: 'instances'   , name: 'instances'   , moduleId: 'main/workspaces/instances/instances'      , nav: true, title: 'Instances' },
            { route: 'settings'    , name: 'settings'    , moduleId: 'main/workspaces/settings/settings'        , nav: true, title: 'Settings' }
        ]);

        this.router = router;
    }

}