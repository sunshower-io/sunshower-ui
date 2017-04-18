import 'jquery'
import {Router, RouterConfiguration} from 'aurelia-router';
import {PipelineStep} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";
import {Next} from "aurelia-router";
import {autoinject} from "aurelia-framework";
import {RedirectToRoute} from "aurelia-router";

import {
    AuthenticationContextHolder
} from "lib/common/security";
import {Container} from "aurelia-dependency-injection";

@autoinject
export class App {

    public router: Router;

    constructor(private tokenHolder: AuthenticationContextHolder) {

    }

    public configureRouter(config: RouterConfiguration,
                           router: Router) {
        config.title = 'Hasli.io';
        config.addPipelineStep('authorize', new SecurityStep(this.tokenHolder));
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

