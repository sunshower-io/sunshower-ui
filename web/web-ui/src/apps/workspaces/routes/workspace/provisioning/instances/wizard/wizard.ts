import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";
export class CreateInstanceWizard {

    router: Router;



    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = '';
        config.map([

            // Instances Route
            {
                route: 'catalog',
                name: 'catalog',
                moduleId: 'apps/catalog/index',
                nav: true,
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
        console.log("Got one");
        setTimeout(() => {
            $(this.container).modal('show');
        }, 1000);

    }
}