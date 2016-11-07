
import {AuthenticationContextHolder} from "src/model/core/security";
import {Router, RouterConfiguration} from "aurelia-router";
export class Manage {

    router:Router;

    constructor(private tokenHolder:AuthenticationContextHolder) {
    }


    public configureRouter(config:RouterConfiguration, router:Router) {
        config.title = "Manage";
        config.map([{
            route: ['', 'node_configurations'],
            name: 'node_configurations',
            moduleId: 'main/manage/node_configurations/node_configurations',
            nav: true,
            title: 'Node Configurations',
            settings: {
                icon: 'settings',
                isActive: true
            }
        }, {
            route: 'keyrings',
            name: 'keyrings',
            moduleId: 'main/manage/keyrings/keyrings',
            nav: true,
            title: "Keyrings",
            settings: {
                icon: 'privacy'
            }
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