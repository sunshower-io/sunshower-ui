import 'jquery'
import 'semantic-ui'
import {Router, RouterConfiguration} from 'aurelia-router';
import {AuthenticationContextHolder} from "../model/core/security/index";
import {inject} from "aurelia-framework";
import {BannerElements} from "./banner/elements";

@inject(
    AuthenticationContextHolder,
    BannerElements
)
export class App {
    public router: Router;

    constructor(private tokenHolder: AuthenticationContextHolder,
                private bannerElements: BannerElements) {
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = '';
        config.map([{
            route: '',
            redirect: 'home'
        }, {
            route: 'home',
            name: 'navigator',
            moduleId: './home/home',
            nav: true,
            title: 'Home',
        }, {
            route: 'workspace',
            name: 'navigator',
            moduleId: './workspace/workspace',
            nav: true,
            title: 'Workspace',
        }, {
            route: 'settings',
            name: 'settings',
            moduleId: 'main/settings/settings',
            nav: false,
            title: 'Settings',
            settings: {}
        }
        ]);
        this.router = router;
    }

    attached() {
        $('.menu .ion-grid.icon')
            .popup({
                on: 'click',
                inline: true,
                hoverable: true,
                position: 'bottom center',
                delay: {
                    hide: 100
                }
            })
        ;
    }
}

