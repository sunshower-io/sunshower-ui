import {RouterConfiguration, Router} from "aurelia-router";

import {
    Editor,
    NavigationAware
} from './editor';

import {MenuItem} from 'common/elements/menu';

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