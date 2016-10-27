import 'jquery'
import 'semantic-ui'
import {Router, RouterConfiguration} from 'aurelia-router';
import {Aurelia} from "aurelia-framework";
import {inject} from "aurelia-dependency-injection";

@inject(Aurelia)
export class Auth {
    public router: Router;

    constructor(private aurelia: Aurelia) {

    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.map([
            {
                route: ['', 'login'],
                name: 'login',
                moduleId: 'auth/login/login',
                nav: true,
                title: 'Login'
            }, {
                route: 'signup',
                name: 'signup',
                moduleId: 'auth/signup/signup',
                nav: true,
                title: 'Signup'
            }
        ]);

        this.router = router;
    }

    public setAppRoot(): void {
        this.router.navigate('/', { replace: true, trigger: false });
        this.aurelia.setRoot('app');
        this.aurelia.setRoot('app');
    }

}

