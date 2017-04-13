import 'jquery'
import 'semantic-ui'
import {Router, RouterConfiguration} from 'aurelia-router';
import {PipelineStep} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";
import {Next} from "aurelia-router";
import {autoinject} from "aurelia-framework";
import {RedirectToRoute} from "aurelia-router";

import {
    AuthenticationContextHolder
} from "common/model/security";
import {Container} from "aurelia-dependency-injection";
import {ContextResolver} from "common/model/common/context-resolver";
import {WorkspaceNavigator} from "apps/workspaces/resources/custom-elements/navigator/workspace/workspace-navigator";


@autoinject
export class App {

    public router           : Router;

    constructor(
        private tokenHolder: AuthenticationContextHolder,
        private context: WorkspaceNavigator,
        private container:Container
    ) {

    }

    public configureRouter(
        config: RouterConfiguration,
        router: Router
    ) {
        config.title = 'Hasli.io';
        config.addPipelineStep('authorize', new SecurityStep(this.tokenHolder));
        config.addPipelineStep('preActivate', new ContextResolver(this.container));
        // config.map([{
        //     route: '',
        //     redirect: 'workspaces'
        // }, {
        //     route: 'workspaces',
        //     name: 'workspaces',
        //     moduleId: 'apps/workspaces/index',
        //     nav: false,
        //     title: 'Workspaces',
        // }, {
        //     route: 'workspace/:workspaceId',
        //     name: 'workspace',
        //     title: 'Workspace',
        //     moduleId: 'apps/workspaces/routes/workspace/index',
        //     nav: false
        // }, {
        //     route: 'catalog',
        //     name: 'catalog',
        //     moduleId: 'apps/catalog/index',
        //     nav: false,
        //     title: 'Catalog',
        // }]);

        config.map([{
            route: '',
            redirect: 'workspaces'
        }, {
            route: 'workspaces',
            name: 'workspaces',
            moduleId: 'apps/workspaces/index',
            nav: true,
            title: 'Workspaces'
        }]);
        this.router = router;
        this.context.router = router;
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

