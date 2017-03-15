import 'jquery';
import {bindable} from 'aurelia-framework';
import {
    Router,
    RouterConfiguration
} from "aurelia-router";
import {Banner} from 'common/banner/banner';


export class WorkspaceView {

    public router: Router;

    @bindable
    public loading: boolean;


    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspace';
        config.map([
            {
                route: 'navigator',
                name: 'Navigator',
                moduleId: './navigator/navigator',
                nav: true,
                title: 'Navigator',
                settings: {
                    parent: false,
                    child: false
                }
            }, {
                route: ['', 'draftboard/:id?'],
                name: 'draftboard',
                moduleId: './draftboards/draftboard',
                nav: true,
                title: 'draftboard',
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
        Banner.close();
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