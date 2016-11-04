

import {
    Router,
    RouterConfiguration
} from "aurelia-router";


export class Infrastructure {
    public router:Router;

    public configureRouter(config:RouterConfiguration, router:Router) {
        config.map([
            {
                route: ['', 'credentials'],
                name: 'credentials',
                moduleId: './credentials/credentials',
                nav: true,
                title: 'credentials'
            },
            {
                route: 'projects',
                name: 'projects',
                moduleId: './projects/projects',
                nav: true,
                title: 'projects'
            }
        ]);
        this.router = router;
    }
}