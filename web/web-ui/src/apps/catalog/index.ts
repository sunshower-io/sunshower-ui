import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";
import {autoinject} from "aurelia-framework";

@autoinject
export class Catalog {
    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            // Applications
            {
                route: [':id', ':id/apps/custom'],
                nav:false,

                name: 'catalog',
                moduleId: './routes/categories/categories',
                title: 'My Apps',
                settings: {category: 'Applications'}
            }
        ]);

        config.mapUnknownRoutes({
            route: 'apps/containers',
            redirect: 'apps/containers'
        });

        this.router = router;
    }


    public id: string;

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