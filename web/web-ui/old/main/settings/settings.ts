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
                settings: {
                    icon: 'user'
                }
            }, {
                route: 'admin',
                name: 'admin',
                moduleId: 'main/settings/admin/admin',
                nav: true,
                title: 'Admin',
                settings: {
                    icon: 'setting'
                }
            },
            {
                route: 'storage',
                name: 'storage',
                moduleId: 'main/settings/storage/storage',
                nav: true,
                title: "Storage Configuration",
                settings: {
                    icon: 'database'
                }
            }]);
        this.router = router;


    }

}