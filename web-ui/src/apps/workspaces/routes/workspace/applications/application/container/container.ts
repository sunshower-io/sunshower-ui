import {autoinject} from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";
import {bindable} from "aurelia-framework";
import {Provider} from "common/model/api/hal/api";
import {HttpClient} from "aurelia-fetch-client";

@autoinject
export class Container {

    public router: Router;


    constructor(private client: HttpClient) {

    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            {route: ['', 'general'], name: 'General', moduleId: './settings/general', nav: true, title: 'General'},
            {route: 'ports', name: 'Ports', moduleId: './settings/ports', nav: true, title: 'Ports'},
            {route: 'volumes', name: 'Volumes', moduleId: './settings/volumes', nav: true, title: 'Volumes'},
            {route: 'files', name: 'Files', moduleId: './settings/files', nav: true, title: 'Files'},
            {
                route: 'dockerfile',
                name: 'Dockerfile',
                moduleId: './settings/dockerfile',
                nav: true,
                title: 'Dockerfile'
            },
            {route: 'args', name: 'Args', moduleId: './settings/args', nav: true, title: 'Args'},
            {route: 'output', name: 'output', moduleId: './settings/output', nav: true, title: 'Output'},
        ]);

        this.router = router;
    }

    buildContainer() : void {
        this.router.navigate('output');
    }


}