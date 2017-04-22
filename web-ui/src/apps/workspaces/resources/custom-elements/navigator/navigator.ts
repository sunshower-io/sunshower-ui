import {UUID} from 'lib/common/lang';
import {
    bindable,
    autoinject,
    customElement
} from "aurelia-framework";
import 'materialize-css';
import 'mdi/css/materialdesignicons.css!'

import {Router, NavModel} from "aurelia-router";

import {
    NavigationComponent,
    NavigatorManager
} from "apps/workspaces/resources/custom-elements/navigator";
import {VelocityAnimator} from "aurelia-animator-velocity";
import {ApplicationState} from "lib/common/storage/application-state";


@autoinject
@customElement('navigator')
export class Navigator {


    @bindable
    private controlId: string;

    @bindable
    private opened: boolean;

    private navigationControl: HTMLElement;
    private navigationContainer: HTMLElement;


    @bindable
    private currentComponent: NavigationComponent;

    @bindable
    private title: string;



    constructor(private animator: VelocityAnimator,
                private state: ApplicationState,
                private navigatorManager:NavigatorManager
    ) {
    }


    public attached(): void {
        this.opened = this.navigatorManager.open;
        if(!this.opened) {
            this.hide();
        }

    }


    setOpen(open: boolean) {
        this.opened = open;
    }

    public show(): void {
        Promise.all([
            this.navigationContainer ? this.animator.leave(this.navigationContainer) : Promise.resolve(true),
            this.animator.leave(this.navigationControl)
        ]);
    }

    public hide(): void {
        Promise.all([
            this.navigationContainer ? this.animator.enter(this.navigationContainer) : Promise.resolve(true),
            this.animator.enter(this.navigationControl)
        ]);
    }



    public toggle(): void {
        if (this.opened) {
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
            this.title = model.title;
        }
        return true;
    }


}