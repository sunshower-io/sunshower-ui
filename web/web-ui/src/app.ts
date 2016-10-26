import 'jquery'
import 'semantic-ui'
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
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
