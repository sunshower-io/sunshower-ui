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
export class Workspace {

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
        config.title = '';
        config.map([

            // Dashboard
            {route: ['', 'dashboard'], name: 'dashboard', moduleId: './dashboard/dashboard', nav: true, title: 'Dashboard'},

            // Application Routes
            {route: 'applications', name: 'applications', moduleId: './applications/applications', nav: true, title: 'Applications'},
            {route: 'applications/:id/application', name: 'application', moduleId: './applications/application/application', nav: false, title: 'Application'},

            // Cloud Routes
            {route: 'clouds', name: 'clouds', moduleId: './clouds/clouds', nav: true, title: 'Clouds'},
            {route: 'clouds/new', name: 'create-cloud', moduleId: './clouds/add-cloud', nav: false, title: 'Clouds'},
            {route: 'clouds/:id/credential/new', name: 'add-cloud-credential', moduleId: './clouds/add-credential', nav: false, title: 'Add Cloud Credential'},

            // Instances Routes
            {route: 'instances', name: 'instances', moduleId: './instances/instances', nav: true, title: 'Instances'},
            {route: 'instances/new', name: 'new-instance', moduleId: './instances/new', nav: false, title: 'New Instance'},

            // Designer
            {route: 'designer', name: 'designer', moduleId: './designer/designer', nav: true, title: 'Designer'},

            // Settings
            {route: 'settings', name: 'settings', moduleId: './settings/settings', nav: true, title: 'Settings'},


        ]);

        // config.mapUnknownRoutes({
        //     route: 'dashboard',
        //     redirect: 'dashboard'
        // });

        this.router = router;
    }


    detached(): void {
    }


    open(id: string): void {
        this.router.navigate('4/applications');
    }
}