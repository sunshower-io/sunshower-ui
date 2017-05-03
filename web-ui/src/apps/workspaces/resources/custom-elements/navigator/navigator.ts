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
import {EventAggregator} from "aurelia-event-aggregator";
import {SideNavEvents} from "../events";


@autoinject
@customElement('navigator')
export class Navigator {


    @bindable
    private controlId: string;

    @bindable
    public opened: boolean;

    private navigationControl: HTMLElement;
    private navigationContainer: HTMLElement;


    @bindable
    private currentComponent: NavigationComponent;

    @bindable
    private title: string;



    constructor(private animator: VelocityAnimator,
                private state: ApplicationState,
                private navigatorManager:NavigatorManager,
                private ea:EventAggregator
    ) {
    }


    public attached(): void {
        this.opened = this.navigatorManager.open;
        if(!this.opened) {
            this.hide();
            this.opened = false; //to ensure it's not undefined ever
        } else {
            this.open(this.navigatorManager.currentInstruction.config.navModel);
            this.show();
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
        this.fireEvent();
    }


    private open(model: NavModel) {
        let settings = model.settings;
        if (settings && settings.contextComponent) {
            this.currentComponent = settings.contextComponent;
            this.currentComponent.active = true;
            this.opened = true;
            this.title = model.title;
            this.fireEvent();
        }
        return true;
    }

    private fireEvent() : void {
        this.ea.publish(SideNavEvents.TOGGLED, {navState: this.opened});
    };


}