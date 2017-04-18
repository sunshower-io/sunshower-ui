import {UUID} from 'lib/common/lang';
import {
    bindable,
    autoinject
} from "aurelia-framework";
import 'materialize-css';
import 'mdi/css/materialdesignicons.css!'

import {Router, NavModel} from "aurelia-router";

import {
    NavigationComponent,
    NavigatorManager
} from "apps/workspaces/resources/custom-elements/navigator";


@autoinject
export class Navigator {


    @bindable
    private controlId               : string;

    @bindable
    private opened                  : boolean;

    private navigationControl       : HTMLElement;

    @bindable
    private currentComponent        : NavigationComponent;

    constructor(private navigatorManager: NavigatorManager) {
        this.controlId = UUID.randomUUID().value;
    }

    public attached() : void {
        $(this.navigationControl).sideNav();
        this.currentComponent = this.navigatorManager.getCurrent();
    }

    public show() : void {
        $(this.navigationControl).sideNav('show');
        this.opened = true;
    }

    public hide() : void {
        $(this.navigationControl).sideNav('hide');
        this.opened = false;
    }

    private toggle() : void {
        if(this.opened) {
            this.hide();
        } else {
            this.show();
        }
    }


    private open(model:NavModel) {
        let settings = model.settings;
        if(settings && settings.contextComponent) {
            this.currentComponent = settings.contextComponent;
            this.currentComponent.active = true;
        }
    }
}