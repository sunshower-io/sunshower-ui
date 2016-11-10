import 'jquery'
import 'semantic-ui'
import {Router, RouterConfiguration} from 'aurelia-router';
import {AuthenticationContextHolder} from "../model/core/security/index";
import {inject} from "aurelia-framework";

@inject(AuthenticationContextHolder)
export class App {
    public router: Router;

    constructor(private tokenHolder:AuthenticationContextHolder) {
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.map([
            // {
            //     route: ['', 'home'],
            //     name: 'home',
            //     moduleId: 'main/home/home',
            //     nav: false,
            //     title: 'home',
            //     settings: {
            //         icon: ''
            //     }
            // },
            {
                route: ['', 'workspaces'],
                name: 'Workspaces',
                moduleId: 'main/workspace/workspaces',
                nav: true,
                title: 'Workspaces',
                settings: {
                    icon: 'block layout icon'
                }
            }, {
                route: 'workspaces/workspace',
                name: 'Workspace',
                moduleId: 'main/workspace/workspace-router',
                nav: false,
                title: 'Workspaces',
            }, {
                route: 'applications',
                name: 'Applications',
                moduleId: 'main/applications/applications',
                nav: true,
                title: 'App Library',
                settings: {
                    icon: 'cubes icon'
                }
            }, {
                route: 'infrastructure',
                name: 'Infrastructure',
                moduleId: 'main/infrastructure/infrastructure',
                nav: true,
                title: 'Infrastructure',
                settings: {
                    icon: 'server icon'
                }
            }, {
                route: 'storage',
                name: 'Storage',
                moduleId: 'main/storage/storage',
                nav: true,
                title: 'Storage',
                settings: {
                    icon: 'database icon'
                }
            }, {
                route: 'manage',
                name: 'Manage',
                moduleId: 'main/manage/manage',
                nav: true,
                title: 'Manage',
                settings: {
                    icon: 'settings icon'
                }
            }, {
                route: 'reports',
                name: 'Reports',
                moduleId: 'main/reports/reports',
                nav: true,
                title: 'Reports',
                settings: {
                    icon: 'line chart icon'
                }
            }
        ]);

        config.mapUnknownRoutes('main/home/home');

        this.router = router;
    }

    attached() {
        $('.menu .grid.layout.icon')
            .popup({
                on         : 'click',
                inline     : true,
                hoverable  : true,
                position   : 'bottom center',
                delay: {
                    hide: 100
                }
            })
        ;
    }
}

