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
                redirect: 'dashboard',
                name: 'home',
                moduleId: 'home/home',
                nav: false,
                title: 'home'
            }, {
                route: 'dashboard',
                name: 'Dashboard',
                moduleId: 'dashboard/dashboard',
                nav: true,
                title: 'Dashboard'
            }, {
                route: 'applications',
                name: 'Applications',
                moduleId: 'applications/applications',
                nav: true,
                title: 'Applications'
            }, {
                route: 'infrastructure',
                name: 'Infrastructure',
                moduleId: 'infrastructure/infrastructure',
                nav: true,
                title: 'Infrastructure'
            }, {
                route: 'storage',
                name: 'Storage',
                moduleId: 'storage/storage',
                nav: true,
                title: 'Storage'
            }, {
                route: 'manage',
                name: 'Manage',
                moduleId: 'manage/manage',
                nav: true,
                title: 'Manage'
            }, {
                route: 'reports',
                name: 'Reports',
                moduleId: 'reports/reports',
                nav: true,
                title: 'Reports'
            }, {
                route: 'logs',
                name: 'Logs',
                moduleId: 'logs/logs',
                nav: true,
                title: 'Logs'
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
