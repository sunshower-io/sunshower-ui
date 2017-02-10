import {Router} from "aurelia-router";
import {RouterConfiguration} from "aurelia-router";


export class Workspace {

    private router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspaces';
        this.router = router;
        config.title = '';
        config.map([{
            route: ['', 'home'],
            name: 'home',
            moduleId: './routes/workspace/index',
            nav: false,
            title: 'Home'
        }]);
    }
}