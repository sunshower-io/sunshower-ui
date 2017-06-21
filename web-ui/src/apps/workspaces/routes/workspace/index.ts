import {autoinject} from 'aurelia-framework';

import {
    Router,
    RouterConfiguration
} from 'aurelia-router';


import {
    WorkspaceService
} from "apps/workspaces/lib/model/core/workspace/service";
import {NavigationAware} from "../../resources/custom-elements/navigator";

@autoinject
export class WorkspaceContext {


    constructor(private router: Router,
                private workspaceService: WorkspaceService
    ) {

    }

    activate(params: any) {
        this.workspaceService.current().then(t => {
            (this.router as any).title = t.name;
        });
    }


    configureRouter(config: RouterConfiguration,
                    router: Router) {
        config.options.breadcrumb = true;
        config.map([{
            route: ['', 'designer'],
            moduleId: './orchestration/designer/designer',
            name: 'designer'
        }]);
        // config.map([{
        //     route: ['', 'dashboard'],
        //     moduleId: './dashboard/index',
        //     name: 'dashboard',
        //     nav: true,
        //     title: 'Dashboard',
        //     settings: {
        //         icon: 'mdi-web',
        //         contextComponent: {
        //             reference: 'apps/workspaces/routes/workspace/dashboard/context-menu'
        //         }
        //     }
        // }, {
        //     route: 'applications',
        //     moduleId: './applications/index',
        //     name: 'applications',
        //     nav: true,
        //     title: 'Applications',
        //     settings: {
        //         icon: 'mdi-apps',
        //         contextComponent: {
        //             reference: 'apps/workspaces/routes/workspace/applications/context-menu'
        //         }
        //     }
        // }, {
        //     route: 'infrastructure',
        //     moduleId: './infrastructure/index',
        //     name: 'infrastructure',
        //     nav: true,
        //     title: 'Infrastructure',
        //     settings: {
        //         icon: 'mdi-cloud-outline',
        //         contextComponent: {
        //             reference: 'apps/workspaces/routes/workspace/infrastructure/context-menu'
        //         }
        //     }
        // }, {
        //     route: 'orchestration',
        //     moduleId: './orchestration/index',
        //     name: 'orchestration',
        //     nav: true,
        //     title: 'Orchestration',
        //     settings: {
        //         icon: 'mdi-android-studio',
        //         contextComponent: {
        //             reference: 'apps/workspaces/routes/workspace/orchestration/context-menu'
        //         }
        //     }
        // }]);
    }


}