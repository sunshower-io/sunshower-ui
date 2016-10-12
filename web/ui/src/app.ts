import * as $ from 'jquery';
import {Router, RouterConfiguration} from 'aurelia-router'

export class App {


    router:Router;

    constructor() {


    }

    configureRouter(config:RouterConfiguration, router:Router) {
        config.title = 'Hasli.io';
        // config.map([{
        //     route: '',
        //     name: 'login',
        //     title: 'login',
        //     moduleId: 'home/login'
        // }])
        config.map([{
                route: ['', 'login'],
                name: 'login',
                moduleId: 'home/login/login',
                nav: true,
                title: 'login'
            }
        ]);
        this.router = router;
    }


    toggleMenu():void {
        // $('#wrapper').toggleClass('toggled');
    }

}
