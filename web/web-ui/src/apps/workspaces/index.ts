import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";


export class Workspace {

    private router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = '';
        this.router = router;
        config.title = '';
        config.map([{
            route: ['', 'workspaces'],
            name: 'workspaces',
            title: 'Workspaces',
            nav: false,
            moduleId: './routes/workspace/workspaces/workspaces',
        }, {
            route: ':id',
            name: 'workspace',
            title: 'Workspace',
            moduleId: './routes/workspace/index',
            nav: false

        }]);
        config.mapUnknownRoutes({
            route: 'workspaces',
            redirect: 'workspaces'
        });
    }

}