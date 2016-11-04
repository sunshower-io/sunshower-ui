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
            {
                route: ['', 'home'],
                name: 'home',
                moduleId: 'main/home/home',
                nav: false,
                title: 'home'
            }
            , {
                route: 'dashboard',
                name: 'Dashboard',
                moduleId: 'main/dashboard/dashboard',
                nav: true,
                title: 'Dashboard'
            }, {
                route: 'applications',
                name: 'Applications',
                moduleId: 'main/applications/applications',
                nav: true,
                title: 'Applications'
            }, {
                route: 'infrastructure',
                name: 'Infrastructure',
                moduleId: 'main/infrastructure/infrastructure',
                nav: true,
                title: 'Infrastructure'
            }, {
                route: 'storage',
                name: 'Storage',
                moduleId: 'main/storage/storage',
                nav: true,
                title: 'Storage'
            }, {
                route: 'manage',
                name: 'Manage',
                moduleId: 'main/manage/manage',
                nav: true,
                title: 'Manage'
            }, {
                route: 'reports',
                name: 'Reports',
                moduleId: 'main/reports/reports',
                nav: true,
                title: 'Reports'
            }, {
                route: 'logs',
                name: 'Logs',
                moduleId: 'main/logs/logs',
                nav: true,
                title: 'Logs'
            }
        ]);

        config.mapUnknownRoutes('main/home/home');

        this.router = router;
    }
}

