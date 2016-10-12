import * as $ from 'jquery';
import {Router, RouterConfiguration} from 'aurelia-router'

export class App {


    router:Router;

    constructor() {


    }

    configureRouter(config:RouterConfiguration, router:Router) {
        config.title = 'Stormchaser';
        config.map([{
            route: '', 
            redirect: 'network'
        }, {
            route: 'network',
            name: 'network',
            moduleId: 'network/network',
            nav: true,
            title: 'Network'
        }, {
            route: 'node',
            name: 'node',
            title: 'Node',
            moduleId: 'nodes/node'
        }]);
        this.router = router;
    }


    toggleMenu():void {
        $('#wrapper').toggleClass('toggled');
    }

}
