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
import {Breadcrumb} from "./breadcrumb/breadcrumb";
import {PreferenceManager} from "storage/application-state";
import {Workspaces} from "apps/workspaces/routes/workspace/index";

@inject(Workspaces, Menu, PreferenceManager)
export class Draftboard {

    public router: Router;

    @bindable
    private child: NavigationAware;

    @bindable
    private menus: MenuItem[] = [];

    private breadcrumb: Breadcrumb;

    private preferences: any;

    static readonly draftboardPath: string = 'main/workspace/draftboards/Draftboard';

    static readonly draftboardDefaults = {
        leftToggled: true,
        rightToggled: true
    };

    constructor(
        private parent: Workspaces,
        private menu : Menu,
        private preferenceManager : PreferenceManager
    ) {
        this.preferences = this.preferenceManager.get(
            Draftboard.draftboardPath,
            Draftboard.draftboardDefaults
        );
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([{
            route: ['', 'application'],
            name: 'applications',
            nav: true,
            title: 'Applications',
            moduleId: 'main/designer/draftboards/applications/applications',
            settings: {
                icon: 'block layout icon'
            }
        }]);
        this.router = router;
    }

    attached() : void {
        console.log("frap");
        this.parent.setMenuVisible(false);
    }

    set(child: NavigationAware): void {
        this.child = child;
        this.menu.setItems((<any>child).menus);

        if (this.preferences.leftToggled) {
            this.breadcrumb.pad();
        } else {
            this.toggleLeft();
        }

        if (!this.preferences.rightToggled) {
            this.toggleRight();
        }
    }

    toggleLeft(): boolean {
        let childToggleLeft = this.child.toggleLeft(),
            toggled = this.toggle(
            'margin-left',
            childToggleLeft, '0px', '-304px');
        if(toggled) {
            this.breadcrumb.pad();
        } else {
            this.breadcrumb.unpad();
        }
        return (this.preferences.leftToggled = toggled);
    }


    toggleRight(): boolean {
        let childToggleRight = this.child.toggleRight();
        this.preferences.rightToggled = childToggleRight;
        return (this.preferences.rightToggled = this.toggle('margin-right', childToggleRight, '304px', '0px'))
    }

    hasDraftBoards(): boolean {
        return false;
    }

    private toggle(style: string,
                   expanded: boolean,
                   open: string,
                   close: string): boolean {
        if (expanded) {
            $(this.menu.element).css(style, open);
        } else {
            $(this.menu.element).css(style, close);
        }
        return expanded;
    }
}