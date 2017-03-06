import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";

/**
 * Created by dustinlish on 3/4/17.
 */

export class Environment {


    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = '';
        config.map([

            // Cloud Route
            {route: ['', 'application'], name: 'environment/application', moduleId: './applications/applications', nav: true, title: 'Applications', settings: {icon: "ion-ios-cloud"}},

            // Hosts Route
            {route: 'inventory', name: 'environment/inventory', moduleId: './inventory/inventory', nav: true, title: 'Inventory', settings: {icon: "ion-monitor"}},

            // Storage Route
            {route: 'storage', name: 'environment/storage', moduleId: './environment/storage', nav: true, title: 'Storage', settings: {icon: "database"}},

            // KeyPair Route
            {route: 'keypairs', name: 'environment/keypairs', moduleId: './keypairs/keypairs', nav: true, title: 'Key Pairs', settings: {icon: "ion-ios-unlocked"}},

        ]);

        config.mapUnknownRoutes({
            route: 'clouds',
            redirect: 'clouds'
        });

        this.router = router;
    }

}