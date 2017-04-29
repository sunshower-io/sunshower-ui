import 'jquery'

import {Router, RouterConfiguration} from 'aurelia-router';
import {Aurelia} from "aurelia-framework";
import {inject} from "aurelia-dependency-injection";

@inject(Aurelia)
export class Auth {
    public router: Router;

    constructor(private aurelia: Aurelia) {

    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Hasli';
        config.map([
            {
                route: ['', 'login'],
                name: 'login',
                moduleId: 'apps/auth/login/login',
                nav: true,
                title: 'Log In',
                settings : {
                    isActive:true,
                }
            }, {
                route: 'signup',
                name: 'signup',
                moduleId: 'apps/auth/signup/signup',
                nav: true,
                title: 'Sign Up'
            }
        ]);

        config.mapUnknownRoutes('apps/auth/login/login');
        this.router = router;
    }
}

