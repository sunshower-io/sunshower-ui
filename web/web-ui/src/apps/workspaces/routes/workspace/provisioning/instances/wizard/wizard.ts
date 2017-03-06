import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";
import {Workspace} from "apps/workspaces/routes/workspace/index";
import {autoinject} from "aurelia-framework";
@autoinject
export class CreateInstanceWizard {

    router: Router;


    constructor(private workspace:Workspace) {

    }


    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = '';
        config.map([

            // Instances Route
            {
                route: 'catalog',
                name: 'catalog',
                moduleId: 'apps/catalog/index',
                nav: false,
                title: 'Catalog'
            },

            // Images Route
            {
                route: 'cloud',
                name: 'cloud',
                moduleId: './cloud',
                nav: true,
                title: 'Select Cloud',
            },

            // Design Route
            {
                route: 'design',
                name: 'provisioning/design',
                moduleId: './configure',
                nav: true,
                title: 'Configure',
            },

        ]);

        config.mapUnknownRoutes({
            route: 'instances',
            redirect: 'instances'
        });

        this.router = router;
    }

    private container:HTMLElement;

    attached() : void {
        setTimeout(() => {

            this.router.navigateToRoute('catalog', {
                id: 'fuck',
            }, {replace:true});
            $(this.container).modal('show');
        });
    }
}