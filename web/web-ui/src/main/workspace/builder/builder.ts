import {RouterConfiguration, Router} from "aurelia-router";
export class Builder {

    public router:Router;

    configureRouter(config:RouterConfiguration, router:Router) {

        config.map([{
            route: ['', 'application'],
            name: 'applications',
            nav: true,
            title: 'Applications',
            moduleId: 'main/workspace/builder/applications/applications',
            settings:{
                icon: 'block layout icon'
            }
        }, {
            route: 'infrastructure',
            name: 'infrastructure',
            nav: true,
            title: 'Infrastructure',
            moduleId: 'main/workspace/builder/infrastructure/infrastructure',
            settings: {
                icon: 'server icon'
            }
        }, {

            route: 'deploy',
            name: 'deploy',
            nav: true,
            title: 'Deploy',
            moduleId: 'main/workspace/builder/deploy',
            settings: {
                icon: 'arrow right icon'
            }
        }]);
        this.router = router;
    }
}