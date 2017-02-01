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

@inject(Menu, PreferenceManager)
export class Draftboard {

    public router: Router;

    @bindable
    private child: NavigationAware;

    @bindable
    private menus: MenuItem[] = [];

    private breadcrumb: Breadcrumb;

    constructor(private menu : Menu, private preferenceManager : PreferenceManager) {

    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([{
            route: ['', 'application'],
            name: 'applications',
            nav: true,
            title: 'Applications',
            moduleId: 'main/workspace/draftboards/applications/applications',
            settings: {
                icon: 'block layout icon'
            }
        }]);
        this.router = router;
    }

    leftToggled: boolean = true;
    rightToggled: boolean = true;
    draftboardPath: string = 'main/workspace/draftboards/Draftboard';
    attached() : void {
        let preferences = this.preferenceManager.get(this.draftboardPath);
        console.log(preferences);
        if (!preferences) {
            this.savePreferences(true, true);
        }

        this.leftToggled = preferences ? preferences.leftToggled : true;
        this.rightToggled = preferences ? preferences.rightToggled : true;

    }

    set(child: NavigationAware): void {
        this.child = child;
        this.menu.setItems((<any>child).menus);

        if (this.leftToggled) {
            this.breadcrumb.pad();
        } else {
            this.toggleLeft();
        }

        if (!this.rightToggled) {
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
        this.savePreferences(childToggleLeft, this.rightToggled);
        return (this.leftToggled = toggled);
    }


    toggleRight(): boolean {
        let childToggleRight = this.child.toggleRight();
        this.savePreferences(this.leftToggled, childToggleRight);
        return (this.rightToggled = this.toggle('margin-right', childToggleRight, '304px', '0px'))
    }

    hasDraftBoards(): boolean {
        return false;
    }

    private savePreferences(leftBool : boolean, rightBool : boolean) : void {
        this.preferenceManager.put(this.draftboardPath, {leftToggled: leftBool, rightToggled: rightBool});
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