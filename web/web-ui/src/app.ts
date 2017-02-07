import 'jquery'
import 'semantic-ui'
import {Router, RouterConfiguration} from 'aurelia-router';
import {PipelineStep} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";
import {Next} from "aurelia-router";
import {AuthenticationContextHolder} from "./model/core/security/index";
import {inject} from "aurelia-framework";
import {RedirectToRoute} from "aurelia-router";
import {Settings} from './main/settings/settings'

@inject(AuthenticationContextHolder, Settings)
export class App {
    public router: Router;

    constructor(private tokenHolder:AuthenticationContextHolder, private settings:Settings) {
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Hasli.io';
        config.addPipelineStep('authorize', new SecurityStep(this.tokenHolder));

        this.router = router;
        config.title = '';
        config.map([
            {
                route: '',
                redirect: 'workspaces',
            }, {
                route: 'workspaces',
                name: 'workspaces',
                moduleId: 'main/workspaces/workspaces',
                nav: false,
                title: 'Workspaces',
            },
            {
                route: 'workspace',
                name: 'workspace',
                moduleId: 'main/workspaces/workspace/workspace',
                nav: false,
                title: 'Workspace',
            }, {
                route: 'settings',
                name: 'settings',
                moduleId: './main/settings/settings',
                nav: false,
                title: 'Settings',
                settings: {}
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
