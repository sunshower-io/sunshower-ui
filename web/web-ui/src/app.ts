import 'jquery'
import 'semantic-ui'
import {Router, RouterConfiguration} from 'aurelia-router';
import {PipelineStep} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";
import {Next} from "aurelia-router";
import {TokenHolder} from "./model/core/security/index";
import {inject} from "aurelia-framework";
import {RedirectToRoute} from "aurelia-router";

@inject(TokenHolder)
export class App {
    public router: Router;

    constructor(private tokenHolder:TokenHolder) {
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.addPipelineStep('authorize', new SecurityStep(this.tokenHolder));
        config.map([
            {
                route: ['', 'home'],
                name: 'home',
                moduleId: 'home/home',
                nav: true,
                title: 'home'
            }, {
                route: 'login',
                name: 'login',
                moduleId: 'login/login',
                nav: true,
                title: 'login'
            }, {

                route: 'signup',
                name: 'signup',
                moduleId: 'signup/signup',
                nav: true,
                title: 'signup'
            }

        ]);

        this.router = router;
    }
}

class SecurityStep implements PipelineStep {


    constructor(private tokenHolder:TokenHolder) {

    }


    run(instruction: NavigationInstruction, next: Next) {
        if(!instruction.getAllInstructions().some(i => i.config.name == 'login')) {
            console.log("GOT ONE")
            let th = this.tokenHolder.validate();
            if(!th) {
                console.log("VALIDATE");
                return next.complete(new RedirectToRoute('login'))
            } else {
                console.log("NExt");
                return next();
            }
        }
        console.log("end");
        return next();
    }

}
