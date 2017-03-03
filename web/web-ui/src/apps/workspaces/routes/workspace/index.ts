import {autoinject} from "aurelia-dependency-injection";
import {
    Router,
    RouterConfiguration
} from "aurelia-router";
import {Identifier} from "common/lib/lang";
import {
    Subscription,
    EventAggregator
} from "aurelia-event-aggregator";
import {
    WorkspaceRevision
} from "apps/workspaces/model/workspaces/workspace";

import {HttpClient} from "aurelia-fetch-client";

type Mode = 'full' | 'partial';
export interface MenuAware {
    setMenuVisible(visible: boolean): void;
}


@autoinject
export class Workspace {

    public router: Router;

    private mode: Mode;
    private subscription: Subscription;

    public workspace:WorkspaceRevision;

    constructor(
        private client:HttpClient,
        private eventAggregator: EventAggregator
    ) {
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

            {
                route: 'create',
                name: 'create',
                moduleId: './create/create',
                nav: false,
                title: 'Create'
            },
            // Application Routes
            {route: 'applications', name: 'applications', moduleId: './applications/applications', nav: true, title: 'Applications'},
            {route: 'applications/:id/application', name: 'application', moduleId: './applications/application/application', nav: false, title: 'Application'},
            {route: 'applications/new', name: 'add-application', moduleId: './applications/add-application', nav: false, title: 'Applications'},

            // Infrastructure Routes
            {route: 'infrastructure', name: 'infrastructure', moduleId: './infrastructure/infrastructure', nav: true, title: 'Infrastructure'},
            {route: 'clouds', name: 'clouds', moduleId: './infrastructure/clouds/clouds', nav: false, title: 'Clouds'},
            {route: 'clouds/new', name: 'create-cloud', moduleId: './infrastructure/clouds/add-cloud', nav: false, title: 'Clouds'},
            {route: 'clouds/:id/credential/new', name: 'add-cloud-credential', moduleId: './infrastructure/clouds/add-credential', nav: false, title: 'Add Cloud Credential'},

            // Provisioning Routes
            {route: 'provisioning', name: 'provisioning', moduleId: './provisioning/provisioning', nav: true, title: 'Provisioning'},
            {route: 'instances', name: 'instances', moduleId: './provisioning/instances/instances', nav: false, title: 'Instances'},
            {route: 'instances/new', name: 'new-instance', moduleId: './provisioning/instances/new', nav: false, title: 'New Instance'},
            {route: 'instances/:id/instance', name: 'instance', moduleId: './provisioning/instances/instance/instance', nav: false, title: 'Instance'},

            // Designer
            {route: 'designer', name: 'designer', moduleId: './designer/designer', nav: false, title: 'Designer'},

            // Settings
            {route: 'settings', name: 'settings', moduleId: './settings/settings', nav: true, title: 'Settings'},


        ]);

        // TODO: Create 404 page
        // config.mapUnknownRoutes({
        //     route: 'dashboard',
        //     redirect: 'dashboard'
        // });

        this.router = router;

    }


    detached(): void {
    }


    activate(id: Identifier): void {
        this.client.fetch(`workspaces/revision/${id.id}`)
            .then(ws => ws.json() as any)
            .then(ws => {
                console.log(ws);
                this.workspace = ws
            })
            .catch(err => {
                console.log(err);
            });
    }
}