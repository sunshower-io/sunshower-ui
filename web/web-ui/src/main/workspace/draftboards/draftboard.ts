import {
    bindable,
    inject
} from 'aurelia-framework';

import {
    RouterConfiguration,
    Router
} from "aurelia-router";

import {
    Editor,
    NavigationAware
} from './editor';

import {MenuItem} from 'common/elements/menu';
import Menu from 'common/elements/menu';

@inject(Menu)
export class Draftboard {

    public router:Router;

    private child:NavigationAware;
    @bindable
    private menus: MenuItem[] = [];

    private menu:Menu;



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
        this.menu.setItems((<any>child).menus);
    }

    toggleLeft() : boolean {
        return this.toggle(
            'margin-left',
            this.child.toggleLeft(), '0px', '-304px');
    }


    toggleRight() : boolean {
        return this.toggle('margin-right', this.child.toggleRight(), '304px', '0px')
    }

    hasDraftBoards() : boolean {
        return false;
    }

    private toggle(
        style:string,
        expanded:boolean,
        open:string,
        close:string
    ) : boolean {
        if(expanded) {
            $(this.menu.element).css(style, open);
        } else {
            $(this.menu.element).css(style, close);
        }
        return expanded;
    }
}