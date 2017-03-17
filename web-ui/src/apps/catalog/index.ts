import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";
import {autoinject} from "aurelia-framework";
import {CreateInstanceWizard} from "apps/workspaces/routes/workspace/provisioning/instances/wizard/wizard";

@autoinject
export class Catalog {
    public router: Router;
    public id: string;


    constructor(private wizard:CreateInstanceWizard) {

    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            // Applications
            {
                route: [':id', ':id/apps/custom'],
                nav:false,

                name: 'catalog',
                moduleId: './routes/categories/categories',
                title: '',
                settings: {category: 'Applications'}
            }
        ]);

        config.mapUnknownRoutes({
            route: 'apps/containers',
            redirect: 'apps/containers'
        });

        this.router = router;
    }



    activate(workspace: any) {
        if(workspace.id != null) {
            this.id = workspace.id;
        }
    }

    deploy(): void {
        this.router.navigate('/workspace/4/instances/new')
    }

    close(): void {
        this.router.navigateBack();
    }
}