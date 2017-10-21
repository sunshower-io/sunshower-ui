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
            route: ['', 'templates'],
            moduleId: './templates/templates',
            name: 'templates',
            nav: false,
            title: 'Templates',
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
            moduleId: './designer/index',
            name: 'draftboard',
            nav: false,
            title: 'Orchestration Draftboard'
        }]);

        this.router = router;
    }

}