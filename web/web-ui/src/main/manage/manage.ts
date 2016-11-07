
import {AuthenticationContextHolder} from "src/model/core/security";
import {Router, RouterConfiguration} from "aurelia-router";
export class Manage {

    router:Router;

    constructor(private tokenHolder:AuthenticationContextHolder) {
    }


    public configureRouter(config:RouterConfiguration, router:Router) {
        config.title = "Manage";
        config.map([{
            route: ['', 'keyrings'],
            name: 'keyrings',
            moduleId: 'main/manage/keyrings/keyrings',
            nav: true,
            title: "Keyrings"
        }, {
            route: 'networks',
            name: 'home',
            moduleId: 'main/manage/networks/networks',
            nav: true,
            title: 'Networks'
        }]);
        this.router = router;
    }

}