import 'jquery'
import 'semantic-ui'
import {Router, RouterConfiguration} from 'aurelia-router';
import {PipelineStep} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";
import {Next} from "aurelia-router";
import {AuthenticationContextHolder} from "./model/core/security/index";
import {inject} from "aurelia-framework";
import {RedirectToRoute} from "aurelia-router";

@inject(AuthenticationContextHolder)
export class App {
    public router: Router;

    constructor(private tokenHolder:AuthenticationContextHolder) {
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.addPipelineStep('authorize', new SecurityStep(this.tokenHolder));

        config.map([
            {
                route: '',
                redirect: 'main',

            },
            {
                route: 'main',
                nav: true,
                moduleId: './main/main',
                title: 'main',
                name: 'main'
            },
            {
                route: 'settings',
                nav: true,
                moduleId: 'settings/settings',
                title: 'settings',
                name: 'settings'
            },
            {
                route: 'profile',
                nav: true,
                moduleId: 'profile/profile',
                title: 'profile',
                name: 'profile'
            },
        ]);
        config.mapUnknownRoutes('main/main');
        // this.router.navigateToRoute("#/main");


        this.router = router;
    }
}


class SecurityStep implements PipelineStep {


    constructor(private tokenHolder:AuthenticationContextHolder) {

    }


    run(instruction: NavigationInstruction, next: Next) {
        if(!instruction.getAllInstructions().some(i => i.config.name == 'login')) {
            let th = this.tokenHolder.validate();
            if(!th) {
                return next.complete(new RedirectToRoute('login'))
            } else {
                return next();
            }
        }
        return next();
    }

}
