import {AuthenticationContextHolder} from "src/model/core/security";
import {Router, RouterConfiguration} from "aurelia-router";
export class Manage {

    router: Router;

    constructor(private tokenHolder: AuthenticationContextHolder) {
    }


    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "Manage";
        config.map([
            {
                route: ['', 'deploy'],
                name: 'deploy',
                moduleId: 'main/manage/deploy/deploy',
                nav: true,
                title: "Deploy",
                settings: {
                    icon: 'settings',
                    isActive: true
                }
            },
            {
                route: 'nodeconfigs',
                name: 'nodeconfigs',
                moduleId: 'main/manage/nodeconfigs/nodeconfigs',
                nav: true,
                title: "Node Configurations",
                settings: {
                    icon: 'settings',
                    isActive: true
                }
            }, {
                route: 'keyrings',
                name: 'keyrings',
                moduleId: 'main/manage/keyrings/keyrings',
                nav: true,
                title: "Keyrings"
            }, {
                route: 'networks',
                name: 'networks',
                moduleId: 'main/manage/networks/networks',
                nav: true,
                title: 'Networks',
                settings: {
                    icon: 'sitemap'
                }
            }]);
        this.router = router;
    }

}