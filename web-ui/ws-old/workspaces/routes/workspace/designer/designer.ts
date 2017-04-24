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

import {MenuItem, Menu} from 'common/lib/widget';
// import Menu from 'common/elements/menu';
import {Breadcrumb} from "./breadcrumb/breadcrumb";
import {PreferenceManager} from "common/lib/storage";
import {Workspace} from "apps/workspaces/routes/workspace/index";

@inject(Workspace, Menu, PreferenceManager)
export class Designer {

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

    constructor(private parent: Workspace, private menu : Menu, private preferenceManager : PreferenceManager) {
        this.preferences = this.preferenceManager.get(
            Designer.draftboardPath,
            Designer.draftboardDefaults
        );
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([{
            route: ['', 'designer'],
            name: 'designer',
            nav: true,
            title: 'Applications',
            moduleId: 'apps/workspaces/routes/workspace/designer/applications/applications',
            settings: {
                icon: 'block layout icon'
            }
        }]);
        this.router = router;
    }

    attached() : void {
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