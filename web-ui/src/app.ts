import 'jquery'
import {Next} from "aurelia-router";
import {PipelineStep} from "aurelia-router";
import {autoinject} from "aurelia-framework";

import {
    Router,
    RedirectToRoute,
    RouterConfiguration,
    NavigationInstruction
} from 'aurelia-router';

import {
    AuthenticationContextHolder
} from "lib/common/security";
import {bindable} from "aurelia-templating";
import {Container} from 'aurelia-dependency-injection';
import {
    StateResolver,
    ContextResolver
} from "lib/common/pipeline";
import {ApplicationState} from "lib/common/storage/application-state";
import {BindingEngine} from "aurelia-binding";
import {
    NavigationAware,
    NavigatorManager
} from "./apps/workspaces/resources/custom-elements/navigator";

@autoinject
@NavigationAware
export class App {

    @bindable
    private router: Router;

    constructor(
        private container: Container,
        private navManager: NavigatorManager,
        private bindingEngine: BindingEngine,
        private applicationState: ApplicationState,
        private tokenHolder: AuthenticationContextHolder
    ) {

    }


    public configureRouter(config: RouterConfiguration,
                           router: Router) {
        config.title = 'Hasli.io';


        config.addPipelineStep('authorize', new SecurityStep(this.tokenHolder));
        config.addPipelineStep('preActivate', new StateResolver(this.container));
        config.addPipelineStep('preActivate', new ContextResolver(this.container));

        config.map([{
            route: '',
            redirect: 'workspaces'
        }, {
            route: 'workspaces',
            moduleId: './apps/workspaces/index'
        }, , {
            route: 'approvals',
            moduleId: './apps/admin/approvals/approvals',
            name: 'approvals',
            title: 'Approvals'
        }]);

        config.mapUnknownRoutes('./apps/workspaces/index');

        this.router = router;
    }


}


class SecurityStep implements PipelineStep {


    constructor(private tokenHolder: AuthenticationContextHolder) {

    }


    run(instruction: NavigationInstruction, next: Next) {
        if (!instruction.getAllInstructions().some(i => i.config.name == 'login')) {
            let th = this.tokenHolder.validate();
            if (!th) {
                return next.complete(new RedirectToRoute('login'))
            } else {
                return next();
            }
        }
        return next();
    }

}

