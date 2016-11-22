import {AuthenticationContextHolder} from "src/model/core/security";
import {Router, RouterConfiguration} from "aurelia-router";
export class Settings {

    public router: Router;

    constructor(private tokenHolder: AuthenticationContextHolder) {
    }


    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "Settings";
        config.map([
            {
                route: ['', 'admin'],
                name: 'admin',
                moduleId: 'main/settings/admin/admin',
                nav: true,
                title: "Admin",
                settings: {}
            },
            {
                route: 'profile',
                name: 'profile',
                moduleId: 'main/settings/profile/profile',
                nav: true,
                title: "Profile",
                settings: {}
            },
            {
                route: 'hfs',
                name: 'hfs',
                moduleId: 'main/settings/hfs/hfs',
                nav: true,
                title: "HFS Configuration",
                settings: {}
            }]);
        this.router = router;


    }

}