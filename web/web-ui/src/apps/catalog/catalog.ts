import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";
import {autoinject} from "aurelia-framework";

@autoinject
export class Catalog {
    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            // Applications
            {route: 'apps/custom', name: 'Custom', moduleId: './categories/apps/custom', nav: true, title: 'My Apps', settings: {category: 'Applications'}},
            {route: 'apps/containers', name: 'Containers', moduleId: './categories/apps/containers', nav: true, title: 'Containers', settings: {category: 'Applications'}},

            // Services
            {route: 'services/analytics', name: 'Analytics', moduleId: './categories/services/analytics', nav: true, title: 'Analytics', settings: {category: 'Services'} },
            {route: 'services/monitoring', name: 'Monitoring', moduleId: './categories/services/monitoring', nav: true, title: 'Monitoring', settings: {category: 'Services'} },

            // Infrastructure
            {route: 'infrastructure/compute', name: 'Compute', moduleId: './categories/infrastructure/compute', nav: true, title: 'Compute', settings: {category: 'Infrastructure'} },
            {route: 'infrastructure/network', name: 'Network', moduleId: './categories/infrastructure/network', nav: true, title: 'Network', settings: {category: 'Infrastructure'} },
            {route: 'infrastructure/storage', name: 'Storage', moduleId: './categories/infrastructure/storage', nav: true, title: 'Storage', settings: {category: 'Infrastructure'} },
        ]);

        config.mapUnknownRoutes({
            route: 'apps/containers',
            redirect: 'apps/containers'
        });

        this.router = router;
    }
}