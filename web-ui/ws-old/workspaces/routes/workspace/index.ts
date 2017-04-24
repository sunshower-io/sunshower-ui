import {autoinject} from "aurelia-dependency-injection";
import {
    Router,
    RouterConfiguration
} from "aurelia-router";

import {HttpClient} from "aurelia-fetch-client";

import {
    WorkspaceService
} from "common/model/api/workspace/service";
import {
    Workspace as WorkspaceElement
} from "common/model/api/workspace/model";
import {
    WorkspaceNavigator
} from "apps/workspaces/resources/custom-elements/navigator/workspace/workspace-navigator";
import {
    NavigatorManager,
    ContextChangedEvent
} from "apps/workspaces/resources/custom-elements/navigator/navigator-element";

type Mode = 'full' | 'partial';
export interface MenuAware {
    setMenuVisible(visible: boolean): void;
}


@autoinject
export class Workspace {

    public router: Router;

    private mode: Mode;


    private value: any;
    private loading: boolean = false;

    public workspace: WorkspaceElement;


    constructor(
        private navigatorManager : NavigatorManager,
        private workspaceService: WorkspaceService,
        private workspaceNavigator: WorkspaceNavigator
    ) {
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
                route: 'applications/:applicationId/application',
                name: 'application',
                moduleId: './applications/application/application',
                nav: false,
                title: 'Application',
            },
            {
                route: 'applications/new',
                name: 'add-application',
                moduleId: './applications/add-application',
                nav: false,
                title: 'Applications'
            },

            // TODO need to address routing structure with introduction of application types
            {
                route: 'applications/dockercompose',
                name: 'docker-compose',
                moduleId: './applications/application/type/docker-compose/docker-compose',
                nav: false,
                title: 'Docker Compose'
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
                route: 'clouds/:applicationId/credential/new',
                name: 'add-cloud-credential',
                moduleId: './infrastructure/clouds/add-credential',
                nav: false,
                title: 'Add Cloud Credential',
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
                route: 'instances/:applicationId/instance',
                name: 'instance',
                moduleId: './provisioning/instances/instance/instance',
                nav: false,
                title: 'Instance',
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
        this.workspaceNavigator.router = router;
        config.options.navigationContext = this.workspaceNavigator;
    }


    detached(): void {
    }

    attached(): void {
        this.refresh();
    }

    refresh(): void {
        this.workspace = this.workspaceService.workspace;
    }


    activate(value: any): void {

        this.value = value;
        this.loading = true;
    }
}