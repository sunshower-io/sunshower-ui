import {autoinject} from "aurelia-framework";
import {NavigationAware, NavigatorManager} from "apps/workspaces/resources/custom-elements/navigator";
import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";
import {OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template/service";

@autoinject
@NavigationAware
export class Draftboard {

    private router: Router;

    constructor(private navigatorManager:NavigatorManager,
                private orchestrationService:OrchestrationTemplateService) {

    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.options.breadcrumb = true;
        config.map([{
            route: ['', 'designer'],
            moduleId: './designer',
            name: 'designer',
            nav: true,
            title: 'Designer',
            settings: {
                icon: 'mdi-checkbox-multiple-blank'
            }
        }, {
            route: 'deployment',
            moduleId: './deployment',
            name: 'deployment',
            nav: true,
            title: 'Deployment',
            settings: {
                icon: 'mdi-source-branch'
            }
        }]);

        this.router = router;
    }

}