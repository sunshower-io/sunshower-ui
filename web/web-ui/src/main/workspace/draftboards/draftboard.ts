import {RouterConfiguration, Router} from "aurelia-router";


export interface NavigationAware {
    toggleLeft() : void;
    toggleRight() : void;
}

export class Draftboard {

    public router:Router;
    private child:NavigationAware;



    configureRouter(config:RouterConfiguration, router:Router) {

        config.map([{
            route: ['', 'application'],
            name: 'applications',
            nav: true,
            title: 'Applications',
            moduleId: 'main/workspace/draftboards/applications/applications',
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

    set(child:NavigationAware) : void {
        this.child = child;
    }

    toggleLeft() {
        this.child.toggleLeft();
    }

    toggleRight() {
        this.child.toggleRight();
    }

    hasDraftBoards() : boolean {
        return false;
    }

}