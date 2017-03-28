import {NavigationInstruction, Router, RouterConfiguration} from "aurelia-router";
import {autoinject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-fetch-client";

@autoinject
export class DockerCompose {

    private lastLocation : NavigationInstruction;
    private loaded       : boolean;
    private id           : string;
    private workspaceId  : string;

    public router : Router;


    constructor(private client:HttpClient) {
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            {route: ['', 'summary'], name: 'Summary', moduleId: '../../summary', nav: true, title: 'Summary'},
            {route: 'apps', name: 'Apps', moduleId: './apps', nav: true, title: 'Apps'},
            {route: 'compose', name: 'Compose', moduleId: './compose', nav: true, title: 'Compose'},
            {route: 'versions', name: 'Versions', moduleId: '../../versions', nav: true, title: 'Versions'},
            {route: 'activity', name: 'Activity', moduleId: '../../activity', nav: true, title: 'Activity'},
            {route: 'settings', name: 'Settings', moduleId: '../../settings', nav: true, title: 'Settings'},
        ]);

        this.router = router;
    }

    close() : void {
        this.router.navigate(`#/workspace/${this.workspaceId}/applications`);
    }

    back() : void {
        this.router.navigateBack();
    }

}