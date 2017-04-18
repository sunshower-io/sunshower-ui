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

@autoinject
export class App {

    @bindable
    private router: Router;

    constructor(private tokenHolder: AuthenticationContextHolder) {

    }

    public configureRouter(config: RouterConfiguration,
                           router: Router) {
        config.title = 'Hasli.io';
        config.addPipelineStep('authorize', new SecurityStep(this.tokenHolder));

        config.map([{
            route: '',
            redirect: 'workspaces'
        }, {
            route: 'workspaces',
            moduleId: './apps/workspaces/index'
        }]);
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

