import {autoinject} from "aurelia-dependency-injection";
import {
    Router,
    RouterConfiguration
} from "aurelia-router";

@autoinject
export class Workspaces {

    private router: Router;

    constructor() {
    }


    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspaces';

        this.router = router;
        config.title = '';

        config.map([{
            route: ['', 'dashboard'],
            nav: true,
            name: 'Dashboard',
            moduleId: './dashboard/dashboard',
        }, {
            nav: true,
            name: 'applications',
            route: 'applications',
            moduleId: './applications/applications',
        }, {
            nav: true,
            name: 'dashboard',
            route: 'dashboard',
            moduleId: './dashboard/dashboard',
        }, {

            nav: true,
            name: 'instances',
            route: 'instances',
            moduleId: './instances/instances',

        }, {
            nav: true,
            name: 'settings',
            route: 'settings',
            moduleId: './settings/settings',
        }]);

        config.mapUnknownRoutes({
            route: 'dashboard',
            redirect: 'dashboard'
        });
        // config.map([{
        //     route: '',
        //     moduleId: './workspaces/workspaces',
        //     name: '',
        //     nav: false
        // }, {
        //
        //     route: ':id',
        //     nav: 'false',
        //     moduleId: 'view',
        //
        //
        // }]);
        this.router = router;
    }


    open(id: string): void {
        this.router.navigate('4/applications');
    }
}