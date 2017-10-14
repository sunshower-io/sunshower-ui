import {autoinject} from "aurelia-framework";
import {Materialize} from 'materialize-css';
import {
    NavigationAware,
    NavigatorManager
} from 'apps/workspaces/resources/custom-elements/navigator'


import {
    NavigationInstruction,
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
           route: 'create',
            moduleId: './routes/workspace/create/create',
            title: 'Create New Workspace'
        }, {
            route: ':workspaceId',
            moduleId: './routes/workspace/index'
        }]);

        cfg.mapUnknownRoutes((r: NavigationInstruction) => {
            Materialize.toast(`No router ${r.getBaseUrl()} found`, 2000);
            return './apps/workspaces/index';
        });
    }

    attached() : void {
        
    }


}