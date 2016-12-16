import {RouterConfiguration, Router} from "aurelia-router";


export interface NavigationAware {
    toggleLeft() : boolean;
    toggleRight() : boolean;
}

export class Draftboard {

    public router:Router;
    public menu:HTMLElement;
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
        this.toggle('margin-left', this.child.toggleLeft(), '0px', '-304px');
    }


    toggleRight() {
        this.toggle('margin-right', this.child.toggleRight(), '304px', '0px')
    }

    hasDraftBoards() : boolean {
        return false;
    }

    private toggle(
        style:string,
        expanded:boolean,
        open:string,
        close:string
    ) {
        if(expanded) {
            $(this.menu).css(style, open);
        } else {
            $(this.menu).css(style, close);
        }


    }
}