import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";

@autoinject
export class Containers {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            {route: ['', 'general'], name: 'General', moduleId: './settings/general', nav: true, title: 'General'},
            {route: 'ports', name: 'Ports', moduleId: './settings/ports', nav: true, title: 'Ports'},
            {route: 'volumes', name: 'Volumes', moduleId: './settings/volumes', nav: true, title: 'Volumes'},
            {route: 'args', name: 'Args', moduleId: './settings/args', nav: true, title: 'Args'},
        ]);

        this.router = router;
    }

}