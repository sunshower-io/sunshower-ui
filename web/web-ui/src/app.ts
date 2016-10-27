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
                route: ['', 'home'],
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
