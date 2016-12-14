import 'jquery';
import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";

export class WorkspaceView {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspace';
        config.map([{
                route: ['', 'builder'],
                name: 'builder',
                moduleId: 'main/workspace/draftboards/draftboard',
                nav: true,
                title: 'Workbench',
                settings: {
                    parent: false,
                    child: false
                }
            }
        ]);

        this.router = router;
    }

    attached() {
        // $('.ui.sidebar')
        //     .sidebar('toggle');
        $('.page.header.transition')
            .transition('fade in');
        $('.ui.dropdown')
            .dropdown();
    }

}