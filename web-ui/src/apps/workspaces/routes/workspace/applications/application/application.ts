/**
 * Created by dustinlish on 2/20/17.
 */

import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";

import {HttpClient} from "aurelia-fetch-client";
import {Application as App} from "common/model/api/application/model"


@autoinject
export class Application {

    private loaded                  : boolean;

    public router                   : Router;
    private lastLocation            : NavigationInstruction;


    public application             : App;
    private id                      : string;
    private workspaceId             : string;


    constructor(private client:HttpClient) {
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            {route: ['', 'summary'], name: 'Summary', moduleId: './summary', nav: true, title: 'Summary'},
            {route: 'container', name: 'Container', moduleId: './container/container', nav: true, title: 'Container'},
            {route: 'versions', name: 'Versions', moduleId: './versions', nav: true, title: 'Versions'},
            {route: 'activity', name: 'Activity', moduleId: './activity', nav: true, title: 'Activity'},
            {route: 'settings', name: 'Settings', moduleId: './settings', nav: true, title: 'Settings'},
        ]);

        this.router = router;
    }

    close() : void {
        this.router.navigate(`#/workspace/${this.workspaceId}/applications`);
    }

    back() : void {
        this.router.navigateBack();
    }


    attached() : void {
        this.client.fetch(`workspaces/${this.workspaceId}/applications/${this.id}`)
            .then(t => t.json() as any)
            .then(t => {
                this.loaded = true;
                this.application = t;
            });

    }


    activate(params: any, a: any, workspace: NavigationInstruction) {
        this.id = params.id;
        this.workspaceId = workspace.parentInstruction.params.id;
    }


}
