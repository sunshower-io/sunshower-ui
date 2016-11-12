/**
 * Created by dustinlish on 11/9/16.
 */
import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";

export class Infrastructure {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspace';
        config.map([
            {
                route: ['', 'main'],
                name: 'main',
                moduleId: 'main/workspace/infrastructure/main/main',
                nav: false,
                title: 'main',
                settings: ''
            }, {
                route: 'clouds',
                name: 'clouds',
                moduleId: 'main/workspace/infrastructure/clouds/clouds',
                nav: true,
                title: 'Clouds',
                settings: 'cloud outline'
            }, {
                route: 'hosts',
                name: 'hosts',
                moduleId: 'main/workspace/infrastructure/hosts/hosts',
                nav: true,
                title: 'Hosts',
                settings: ''
            }, {
                route: 'storage',
                name: 'storage',
                moduleId: 'main/workspace/infrastructure/storage/storage',
                nav: true,
                title: 'Storage',
                settings: ''
            }
        ]);

        this.router = router;
    }

}
