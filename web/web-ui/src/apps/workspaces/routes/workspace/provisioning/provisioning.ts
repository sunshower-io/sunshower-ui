import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";
/**
 * Created by dustinlish on 3/1/17.
 */

export class Provisioning {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = '';
        config.map([

            // Instances Route
            {route: ['', 'instances'], name: 'provisioning/instances', moduleId: './instances/instances', nav: true, title: 'Instances', settings: {icon: "ion-ios-cloud"}},

            // Images Route
            {route: 'images', name: 'provisioning/images', moduleId: './images/images', nav: true, title: 'Images', settings: {icon: "ion-monitor"}},

            // Design Route
            {route: 'design', name: 'provisioning/design', moduleId: './design/design', nav: true, title: 'Design', settings: {icon: "database"}},

        ]);

        config.mapUnknownRoutes({
            route: 'instances',
            redirect: 'instances'
        });

        this.router = router;
    }


}