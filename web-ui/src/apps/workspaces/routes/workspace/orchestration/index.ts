import {autoinject} from "aurelia-framework";
import {NavigationAware, NavigatorManager} from "apps/workspaces/resources/custom-elements/navigator";
import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";
import {OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template/service";

@autoinject
@NavigationAware
export class WorkspaceOrchestrations {

    private router: Router;

    constructor(private navigatorManager:NavigatorManager,
                private orchestrationService:OrchestrationTemplateService) {

    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.options.breadcrumb = true;
        config.map([{
            route: ['', 'dashboard'],
            moduleId: './dashboard/dashboard',
            name: 'dashboard',
            nav: false,
            title: 'Orchestration Dashboard',
            settings: {
                hideInBreadcrumb: true
            }
        }, {
           route: 'create',
            moduleId: './create/create',
            name: 'create',
            nav: false,
            title: 'Create New Orchestration'
        }, {
            route: ':orchestrationTemplateId',
            moduleId: './designer/designer',
            name: 'designer',
            nav: false,
            title: 'Orchestration Designer'
        }]);

        this.router = router;
    }

}