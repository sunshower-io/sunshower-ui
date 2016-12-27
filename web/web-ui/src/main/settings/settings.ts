import {AuthenticationContextHolder} from "model/core/security";
import {Router, RouterConfiguration} from "aurelia-router";
export class Settings {

    public router: Router;

    constructor(private tokenHolder: AuthenticationContextHolder) {
    }


    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "";
        config.map([
            {
                route: ['', 'profile'],
                name: 'profile',
                moduleId: 'main/settings/profile/profile',
                nav: true,
                title: "Profile",
                settings: {}
            },
            {
                route: 'storage',
                name: 'storage',
                moduleId: 'main/settings/storage/storage',
                nav: true,
                title: "Storage Configuration",
                settings: {}
            }]);
        this.router = router;


    }

}