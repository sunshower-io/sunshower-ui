

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
                title: 'Credentials'
            },
            {
                route: 'projects',
                name: 'projects',
                moduleId: './projects/projects',
                nav: true,
                title: 'Projects'
            }
        ]);
        this.router = router;
    }
}