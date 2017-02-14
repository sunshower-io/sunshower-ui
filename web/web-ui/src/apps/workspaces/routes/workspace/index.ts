import {autoinject} from "aurelia-dependency-injection";
import {
    Router,
    RouterConfiguration
} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";
import {Subscription, EventAggregator} from "aurelia-event-aggregator";

type Mode = 'full' | 'partial';
export interface MenuAware {
    setMenuVisible(visible: boolean): void;
}


@autoinject
export class Workspaces {

    public router: Router;

    private mode: Mode;
    private subscription: Subscription;

    constructor(private eventAggregator: EventAggregator) {
        this.setMenuVisible(true);
    }

    setMenuVisible(visible: boolean): void {
        if (visible) {
            this.mode = 'partial';
        } else {
            this.mode = 'full';
        }

    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspaces';

        this.router = router;
        config.title = '';

        config.map([{
            route: ['', 'dashboard'],
            nav: true,
            title: 'Dashboard',
            name: 'dashboard',
            moduleId: './dashboard/dashboard',
        }, {
            nav: true,
            title: 'Applications',
            name: 'applications',
            route: 'applications',
            moduleId: './applications/applications',
        }, {
            nav: true,
            title: 'Clouds',
            name: 'clouds',
            route: 'clouds',
            moduleId: './clouds/clouds',
        }, {

            nav: false,
            title: 'Clouds',
            name: 'create-cloud',
            route: 'clouds/new',
            moduleId: './clouds/add-cloud',
        }, {

            nav: false,
            title: 'Add Cloud Credential',
            name: 'add-cloud-credential',
            route: 'clouds/:id/credential/new',
            moduleId: './clouds/add-credential',
        },
            {
                nav: true,
                title: 'Instances',
                name: 'instances',
                route: 'instances',
                moduleId: './instances/instances',
            }, {
                nav: true,
                title: 'Settings',
                name: 'settings',
                route: 'settings',
                moduleId: './settings/settings',
            }, {
                nav: true,
                title: 'Designer',
                name: 'designer',
                route: 'designer',
                moduleId: './designer/designer'
            }, {

                nav: false,
                title: 'New Instance',
                name: 'new-instance',
                route: 'instances/new',
                moduleId: './instances/new'
            }

        ]);

        config.mapUnknownRoutes({
            route: 'dashboard',
            redirect: 'dashboard'
        });
        this.router = router;


    }


    detached(): void {
    }


    open(id: string): void {
        this.router.navigate('4/applications');
    }
}