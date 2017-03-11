/**
 * Created by dustinlish on 2/20/17.
 */

import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";

import {Identifier} from "common/lib/lang";
import {HttpClient} from "aurelia-fetch-client";
import {ApplicationRevision} from "apps/workspaces/model/application";


@autoinject
export class Application {

    public router: Router;
    private lastLocation : NavigationInstruction;
    applicationRevision: ApplicationRevision;

    constructor(private client:HttpClient) {
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            {route: ['', 'summary'], name: 'Summary', moduleId: './summary', nav: true, title: 'Summary'},
            {route: 'container', name: 'Container', moduleId: './container/container', nav: true, title: 'Container'},
            {route: 'tasks', name: 'Tasks', moduleId: './tasks', nav: true, title: 'Tasks'},
            {route: 'versions', name: 'Versions', moduleId: './versions', nav: true, title: 'Versions'},
            {route: 'activity', name: 'Activity', moduleId: './activity', nav: true, title: 'Activity'},
        ]);

        this.router = router;
    }

    close() : void {
        this.router.navigateBack();
    }


    attached(identifier: Identifier) : void {

    }


    activate(identifier: Identifier) {

        let id = identifier.id;

        this.client.fetch(`applications/${id}`)
            .then(t => t.json() as any)
            .then(t => {
                this.applicationRevision = t;
            });

    }


}
