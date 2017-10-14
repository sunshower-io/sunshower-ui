import {bindable} from "aurelia-templating";
import {
    NavigationInstruction,
    Router,
    RouterConfiguration
} from "aurelia-router";
export class SettingsPanel {

    private router:Router

    constructor() {


    }


    public configureRouter(config: RouterConfiguration,
                           router: Router) {
        config.map([
            {
                route: 'overview',
                moduleId: './overview/overview',
                name: 'overview',
                nav: true,
                title: 'Overview'
            }, {
                route: 'plugins',
                moduleId: './plugins/plugins',
                name: 'plugins',
                nav: true,
                title: 'Plugins'
            }, {
                route: 'HFS Swarm',
                moduleId: './swarm/swarm',
                name: 'swarm',
                nav: true,
                title: 'HFS Swarm'
            }, {

                route: 'Swell',
                moduleId: './swell/swell',
                name: 'swell',
                nav: true,
                title: 'Swell'
            }
            
        ]);

        config.mapUnknownRoutes((r: NavigationInstruction) => {
            return './overview/overview';
        });
        this.router = router;
    }

    activate(): void {
        $("ul.tabs").tabs();
    }
}