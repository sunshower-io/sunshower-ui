import 'jquery';
import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";

export class WorkspaceView {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspace';
        config.map([
            {
                route: ['', 'dashboard'],
                name: 'dashboard',
                moduleId: 'main/workspace/dashboard/dashboard',
                nav: true,
                title: 'Dashboard',
                settings: {
                    parent: false,
                    child: false
                }
            }, {
                route: 'applications',
                name: 'applications',
                moduleId: 'main/workspace/applications/applications',
                nav: true,
                title: 'App Library',
                settings: {
                    parent: false,
                    child: false
                }
            }, {
                route: 'infrastructure',
                name: 'infrastructure',
                moduleId: 'main/workspace/infrastructure/infrastructure',
                nav: false,
                title: 'Infrastructure',
                settings: {
                    parent: true,
                    child: false
                }
            }, {
                route: 'infrastructure/main',
                name: 'main',
                moduleId: 'main/workspace/infrastructure/main/main',
                nav: true,
                title: 'Infrastructure',
                settings: {
                    parent: true,
                    child: false,
                    childRoutes: [
                        {title: 'Infrastructure', href: '#/main/workspaces/workspace/infrastructure/main/main'},
                        {title: 'Clouds', href: '#/main/workspaces/workspace/infrastructure/clouds'},
                        {title: 'Hosts',  href: '#/main/workspaces/workspace/infrastructure/hosts'},
                        {title: 'Storage', href: '#/main/workspaces/workspace/infrastructure/storage'}
                    ]
                }
            }, {
                route: 'infrastructure/clouds',
                name: 'clouds',
                moduleId: 'main/workspace/infrastructure/clouds/clouds',
                nav: false,
                title: 'Clouds',
                settings: {
                    parent: false,
                    child: true
                }
            }, {
                route: 'infrastructure/hosts',
                name: 'hosts',
                moduleId: 'main/workspace/infrastructure/hosts/hosts',
                nav: false,
                title: 'Hosts',
                settings: {
                    parent: false,
                    child: true
                }
            }, {
                route: 'infrastructure/storage',
                name: 'storage',
                moduleId: 'main/workspace/infrastructure/storage/storage',
                nav: false,
                title: 'Storage',
                settings: {
                    parent: false,
                    child: true
                }
            }, {
                route: 'builder',
                name: 'builder',
                moduleId: 'main/workspace/builder/builder',
                nav: true,
                title: 'Template Builder',
                settings: {
                    parent: false,
                    child: false
                }
            }, {
                route: 'reports',
                name: 'reports',
                moduleId: 'main/workspace/reports/reports',
                nav: true,
                title: 'Reports',
                settings: {
                    parent: false,
                    child: false
                }
            }, {
                route: 'logs',
                name: 'logs',
                moduleId: 'main/workspace/logs/logs',
                nav: true,
                title: 'Logs',
                settings: {
                    parent: false,
                    child: false
                }
            }
        ]);

        this.router = router;
    }

    attached() {
        // $('.ui.sidebar')
        //     .sidebar('toggle');
        $('.page.header.transition')
            .transition('fade in');
        $('.ui.dropdown')
            .dropdown();
    }

}