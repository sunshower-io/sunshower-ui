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
                name: 'home',
                moduleId: 'home/home',
                nav: true,
                title: 'home'
            }, {
                route: 'login',
                name: 'login',
                moduleId: 'login/login',
                nav: true,
                title: 'login'
            },
        ]);

        this.router = router;
    }
}
