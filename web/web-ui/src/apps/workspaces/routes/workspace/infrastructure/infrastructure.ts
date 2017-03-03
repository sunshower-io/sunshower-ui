import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";
/**
 * Created by dustinlish on 3/1/17.
 */

export class Infrastructure {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = '';
        config.map([

            // Cloud Route
            {
                route: ['', 'clouds'],
                name: 'infrastructure/clouds',
                moduleId: './clouds/clouds',
                nav: true,
                title: 'Clouds',
                settings: {icon: "ion-ios-cloud"}
            },

            // Hosts Route
            {
                route: 'hosts',
                name: 'infrastructure/hosts',
                moduleId: './hosts/hosts',
                nav: true,
                title: 'Hosts',
                settings: {icon: "ion-monitor"}
            },

            // Storage Route
            {
                route: 'storage',
                name: 'infrastructure/storage',
                moduleId: './storage/storage',
                nav: true,
                title: 'Storage',
                settings: {icon: "database"}
            },

            // KeyPair Route
            {
                route: 'keypairs',
                name: 'infrastructure/keypairs',
                moduleId: './keypairs/keypairs',
                nav: true,
                title: 'Key Pairs',
                settings: {icon: "ion-ios-unlocked"}
            },

        ]);

        config.mapUnknownRoutes({
            route: 'clouds',
            redirect: 'clouds'
        });

        this.router = router;
    }


}
