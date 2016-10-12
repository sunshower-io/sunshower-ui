import * as $ from 'jquery';
import 'qtip2/dist/jquery.qtip'


import 'fetch';

import 'w2ui/dist/w2ui';
import {
    Router,
    RouterConfiguration
} from "aurelia-router";


export class Network {


    router:Router;
    
    constructor() {
        
    }

    configureRouter(config:RouterConfiguration, router:Router) {
        config.title = 'Stormchaser';
        config.map([{
                route: ['', 'view'],
                name: 'view',
                moduleId: './graph/view',
                nav: true,
                title: 'Network',
                settings: {
                    iconClass: 'ion-earth'
                }
            }]);
        this.router = router;
    }


    toggleMenu():void {
        $('#wrapper').toggleClass('toggled');
    }

    attached():void {


    }
}
