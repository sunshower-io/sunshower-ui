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


    /**
     * Copied from:
     * https://github.com/cmichaelgraham/aurelia-typescript/blob/master/code-sandbox/code-sandbox/views/wiz/wizard.ts
     *
     * @returns {string}
     */
    getActiveRouteIndex() : number {
        for (var routeIndex in this.router.navigation) {
            var route = this.router.navigation[routeIndex];
            if (route.isActive) {
                return parseInt(routeIndex);
            }
        }
    }

    next() {
        let currentIndex = this.getActiveRouteIndex();
        if (currentIndex < this.router.navigation.length - 1) {
            currentIndex++;
            this.router.navigate((<any>this).router.navigation[currentIndex].config.route, true);
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