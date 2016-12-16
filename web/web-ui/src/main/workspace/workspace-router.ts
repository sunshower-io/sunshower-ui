import 'jquery';
import {bindable} from 'aurelia-framework';
import {
    Router,
    RouterConfiguration
} from "aurelia-router";


export class WorkspaceView {

    public router: Router;

    @bindable
    public loading: boolean;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspace';
        config.map([
            {
                route: ['', 'navigator'],
                name: 'builder',
                moduleId: 'main/workspace/draftboard-navigator/navigator',
                nav: true,
                title: 'Workbench',
                settings: {
                    parent: false,
                    child: false
                }
            }, {
                route: 'builder',
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

    activate() : void {
        this.loading = false;
    }


    create() : void {
        this.loading = true;
        this.router.navigate('builder');
        // this.loading = false;
    }

}