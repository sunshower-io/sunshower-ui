import 'jquery';
import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";

export class WorkspaceView {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspace';
        config.map([
            {
                route: ['', 'myapps'],
                name: 'myapps',
                moduleId: 'main/applications/apps/my-apps',
                nav: true,
                title: 'My Applications'
            }
        ]);

        this.router = router;
    }

    attached() {
    }

}