/**
 * Created by dustinlish on 2/20/17.
 */

import {autoinject, bindable} from "aurelia-framework";
import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";

import {Application as App} from "common/model/api/application/model"
import {WorkspaceService} from "common/model/api/workspace/service";
import {ApplicationService} from "common/model/api/application/service";


@autoinject
export class Application {

    private loaded                  : boolean;

    public router                   : Router;
    private lastLocation            : NavigationInstruction;


    @bindable
    public application              : App;
    private id                      : string;
    private workspaceId             : string;


    constructor(
        private workspaceService: WorkspaceService,
        private applicationService:ApplicationService
    ) {
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
        this.router.navigate(`#/workspace/${this.workspaceService.workspace.id}/applications`);
    }

    back() : void {
        this.router.navigateBack();
    }


    attached() : void {
        this.application = this.applicationService.application;
        this.loaded = true;
    }

    activate() : void {
        this.application = this.applicationService.application;

    }



}
