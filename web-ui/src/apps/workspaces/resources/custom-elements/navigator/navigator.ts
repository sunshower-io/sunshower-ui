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
import {VelocityAnimator} from "aurelia-animator-velocity";


@autoinject
export class Navigator {


    @bindable
    private controlId                       : string;

    @bindable
    private opened                          : boolean;

    private navigationContainer             : HTMLElement;
    private navigationControl               : HTMLElement;


    @bindable
    private currentComponent                 : NavigationComponent;


    constructor(
        private animator        : VelocityAnimator,
        private navigatorManager: NavigatorManager
    ) {
        this.controlId = UUID.randomUUID().value;
    }

    public attached(): void {
        this.hide();
    }

    public show(): void {

        Promise.all([
            this.animator.enter(this.navigationContainer),
            this.animator.enter(this.navigationControl)
        ]);
    }

    public hide(): void {
        Promise.all([
            this.animator.leave(this.navigationContainer),
            this.animator.leave(this.navigationControl)
        ]);
    }

    public toggle(): void {
        if(this.opened) {
            this.hide();
        } else {
            this.show();
        }
        this.opened = !this.opened;
    }


    private open(model: NavModel) {
        let settings = model.settings;
        if (settings && settings.contextComponent) {
            this.currentComponent = settings.contextComponent;
            this.currentComponent.active = true;
            this.opened = true;
        }
    }
}