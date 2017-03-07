import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";
import {Workspace} from "apps/workspaces/routes/workspace/index";
import {autoinject} from "aurelia-framework";
import {Subscription, EventAggregator} from "aurelia-event-aggregator";
import {ApplicationRevision} from "apps/workspaces/model/application/application";
@autoinject
export class CreateInstanceWizard {

    router: Router;
    subscription: Subscription;

    applicationRevision:ApplicationRevision;

    constructor(private workspace:Workspace, private eventAggregator:EventAggregator) {

    }


    activate() : void {

        this.subscription = this.eventAggregator.subscribe(
            'application::selected', e => {
                this.select(e);

        });
    }
    deactivate() : void {
        this.subscription.dispose();
    }

    select(revision:any) : void {
        this.applicationRevision = revision;
        this.router.navigate('cloud');
    }


    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = '';
        config.map([

            // Instances Route
            //replaces instance-type-form
            {
                route: 'catalog',
                name: 'catalog',
                moduleId: 'apps/catalog/index',
                nav: false,
                title: 'Catalog'
            },

            {
                route: 'details',
                name: 'details',
                moduleId: 'apps/workspaces/routes/workspace/provisioning/instances/create/forms/instance-details-form',
                nav: false,
                title: 'Details'
            },

            {
                route: 'customize',
                name: 'customize',
                moduleId: 'apps/workspaces/routes/workspace/provisioning/instances/create/forms/app-customize-form',
                nav: false,
                title: 'Customize'
            },

            {
                route: 'summary',
                name: 'summary',
                moduleId: 'apps/workspaces/routes/workspace/provisioning/instances/create/forms/summary-form',
                nav: false,
                title: 'Summary'
            },

            // // Images Route
            // {
            //     route: 'cloud',
            //     name: 'cloud',
            //     moduleId: './cloud',
            //     nav: true,
            //     title: 'Select Cloud',
            // },
            //
            // // Design Route
            // {
            //     route: 'design',
            //     name: 'provisioning/design',
            //     moduleId: './configure',
            //     nav: true,
            //     title: 'Configure',
            // },

        ]);

        config.mapUnknownRoutes({
            route: 'instances',
            redirect: 'instances'
        });

        this.router = router;
    }

    private container:HTMLElement;

    attached() : void {
        //todo close when we're not on one of these routes

        setTimeout(() => {
            this.router.routes[0].navModel.isActive = true;
            this.router.navigateToRoute('catalog', {
                id: 'boop',
            }, {replace:true});

            console.log(this.router);
            $(this.container).modal({
                onHide: () => {
                    console.log('I should redirect back to instances');
                    this.workspace.router.navigateToRoute('provisioning');
                }
            });

            $(this.container).modal('show');
        });
    }

    complete() : void {
        //todo save something
        $(this.container).modal('hide');
    }

    /**
     * Copied from:
     * https://github.com/cmichaelgraham/aurelia-typescript/blob/master/code-sandbox/code-sandbox/views/wiz/wizard.ts
     *
     * @returns {string}
     */
    getActiveRouteIndex() : number {
        for (var routeIndex in this.router.routes) {
            var route = this.router.routes[routeIndex].navModel;
            if (route.isActive) {
                return parseInt(routeIndex);
            }
        }
    }

    next() {
        let currentIndex = this.getActiveRouteIndex();
        // console.log('currentIndex is', currentIndex);
        // if (currentIndex == 3) {
        //     console.log('my index is 3 and I should be closing because last', (this.router.routes.length - 1))
        // }
        if (currentIndex < (this.router.routes.length - 1)) {
            currentIndex++;
            // console.log('new index is', currentIndex);
            this.router.navigate((<any>this).router.routes[currentIndex].navModel.config.route, true);
        } else {
            this.complete();
        }
    }

    prev() {
        var currentIndex = this.getActiveRouteIndex();
        if (currentIndex > 0) {
            currentIndex--;
            var myRoute = (<any>this).router.navigation[currentIndex].config.route;

            // workaround for bug https://github.com/aurelia/router/issues/99
            if (myRoute === "") {
                this.router.navigate("step-one", true);
            } else {
                this.router.navigate(myRoute, true);
            }
        }
    }

}