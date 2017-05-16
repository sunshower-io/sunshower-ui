import {autoinject} from "aurelia-framework";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace";
import {Router, RouterConfiguration} from "aurelia-router";
import {NavigationAware, NavigatorManager} from "apps/workspaces/resources/custom-elements/navigator";

@autoinject
@NavigationAware
export class WorkspaceDashboard {

    private router: Router;
    private tabHolder: HTMLElement;

    constructor(private workspaceService:WorkspaceService, private navigatorManager:NavigatorManager) {

    }

    attached() {
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.options.breadcrumb = true;
        config.map([
            {
                route: ['', 'dashboard'],
                moduleId: './dashboard/dashboard',
                name: 'dashboard',
                nav: true,
                title: 'Dashboard',
                settings: {
                    hideInBreadcrumb: true
                }
            },
            {
                route: 'instances',
                moduleId: './instances/instances',
                name: 'instances',
                nav: true,
                title: 'Instances',
                settings: {
                    badge: '2'
                }
            }
        ]);

        this.navigatorManager.bind(router);

        this.router = router;
        //todo make badge reflect # of instances
        //todo add route for creating new orchestration
    }
}