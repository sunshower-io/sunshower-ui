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
    Workspace as WS,
    WorkspaceRevision
} from "apps/workspaces/model/workspaces/workspace";

import {HttpClient} from "aurelia-fetch-client";
import {ApplicationContext} from "apps/workspaces/model/application-context";

type Mode = 'full' | 'partial';
export interface MenuAware {
    setMenuVisible(visible: boolean): void;
}


@autoinject
export class Workspace {

    public router: Router;

    private mode: Mode;
    private subscription: Subscription;

    public hostWorkspace: WS;
    private id: Identifier;
    private loading: boolean = false;

    //TODO: rename revision
    public workspace: WorkspaceRevision;


    constructor(private client: HttpClient,
                private context:ApplicationContext,
                private eventAggregator: EventAggregator,
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
            {
                route: ['', 'dashboard'],
                name: 'dashboard',
                moduleId: './dashboard/dashboard',
                nav: true,
                title: 'Dashboard'
            },

            // Application Routes
            {
                route: 'applications',
                name: 'applications',
                moduleId: './applications/applications',
                nav: true,
                title: 'Applications'
            },
            {
                route: 'applications/:id/application',
                name: 'application',
                moduleId: './applications/application/application',
                nav: false,
                title: 'Application'
            },
            {
                route: 'applications/new',
                name: 'add-application',
                moduleId: './applications/add-application',
                nav: false,
                title: 'Applications'
            },

            // Infrastructure Routes
            {
                route: 'infrastructure',
                name: 'infrastructure',
                moduleId: './infrastructure/infrastructure',
                nav: true,
                title: 'Infrastructure'
            },
            {route: 'clouds', name: 'clouds', moduleId: './infrastructure/clouds/clouds', nav: false, title: 'Clouds'},
            {
                route: 'clouds/new',
                name: 'create-cloud',
                moduleId: './infrastructure/clouds/add-cloud',
                nav: false,
                title: 'Clouds'
            },
            {
                route: 'clouds/:id/credential/new',
                name: 'add-cloud-credential',
                moduleId: './infrastructure/clouds/add-credential',
                nav: false,
                title: 'Add Cloud Credential'
            },
            {
                route: 'environment',
                name: 'environment',
                moduleId: './infrastructure/clouds/environment/environment',
                nav: false,
                title: 'Environment'
            },

            // Provisioning Routes
            {
                route: 'provisioning',
                name: 'provisioning',
                moduleId: './provisioning/provisioning',
                nav: true,
                title: 'Provisioning'
            },
            {
                route: 'instances',
                name: 'instances',
                moduleId: './provisioning/instances/instances',
                nav: false,
                title: 'Instances'
            },
            {
                route: 'instances/new',
                name: 'new-instance',
                moduleId: './provisioning/instances/new',
                nav: false,
                title: 'New Instance'
            },
            {
                route: 'instances/:id/instance',
                name: 'instance',
                moduleId: './provisioning/instances/instance/instance',
                nav: false,
                title: 'Instance'
            },

            // Designer
            {route: 'designer', name: 'designer', moduleId: './designer/designer', nav: false, title: 'Designer'},

            // Settings
            {route: 'settings', name: 'settings', moduleId: './settings/settings', nav: true, title: 'Settings'},

            // Workspace
            {route: 'create', name: 'create', moduleId: './create/create', nav: false, title: 'Create'},

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

    attached(): void {
        this.client.fetch(`workspaces/revision/${this.context.workspaceRevision.id.id}`)
            .then(ws => ws.json() as any)
            .then(ws => {
                this.loading = false;
                this.workspace = ws;
                this.hostWorkspace = ws.workspace;
            })
            .catch(err => {
                console.log(err);
            });
    }


    activate(id: Identifier): void {
        console.log("Activate");
        this.id = id;
        this.loading = true;
    }
}