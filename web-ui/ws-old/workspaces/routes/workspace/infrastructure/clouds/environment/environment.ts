import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";
import {Workspace} from "../../../../../index";
import {autoinject} from "aurelia-dependency-injection";

/**
 * Created by dustinlish on 3/4/17.
 */

@autoinject
export class Environment {

    public router: Router;

    constructor(private parent:Workspace) {

    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = '';
        config.map([

            // Hosts Route
            {route: ['', 'hosts'], name: 'environment/hosts', moduleId: './hosts/hosts', nav: true, title: 'Hosts', settings: {icon: "ion-monitor"}},

            // Applications Route
            {route: 'application', name: 'environment/application', moduleId: './applications/applications', nav: true, title: 'Applications', settings: {icon: "ion-ios-cloud"}},

            // Storage Route
            {route: 'storage', name: 'environment/storage', moduleId: './environment/storage', nav: true, title: 'Storage', settings: {icon: "database"}},

            // KeyPair Route
            {route: 'keypairs', name: 'environment/keypairs', moduleId: './keypairs/keypairs', nav: true, title: 'Key Pairs', settings: {icon: "ion-ios-unlocked"}},

        ]);

        config.mapUnknownRoutes({
            route: 'hosts',
            redirect: 'hosts'
        });

        this.router = router;
    }

    back(): void {
        this.router.navigateBack();
    }

    close(): void {
        this.parent.router.navigateBack();
    }

}