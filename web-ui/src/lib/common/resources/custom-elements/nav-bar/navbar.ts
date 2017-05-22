import 'jquery';
import {
    Principal as User,
    AuthenticationContextHolder
} from 'lib/common/security';
import { EventAggregator } from 'aurelia-event-aggregator';
import {autoinject} from "aurelia-framework";
import {VelocityAnimator} from "aurelia-animator-velocity";
import {Router, NavigationInstruction} from "aurelia-router";
import {UUID} from 'lib/common/lang';
import {bindable} from "aurelia-framework";
import {SideNavEvents} from "apps/workspaces/resources/custom-elements/events";
import {NavigatorManager} from "apps/workspaces/resources/custom-elements/navigator";
import {Breadcrumb} from "./breadcrumb";

@autoinject
export class Navbar {

    @bindable
    private dropdownId               : string       =  UUID.random();
    private smallddId                : string       = UUID.random();
    private profileDD               : HTMLElement;
    private smallDD                 : HTMLElement;
    private brandLogo               : HTMLElement;

    private breadcrumbs             :any[];

    constructor(private animator: VelocityAnimator,
                private user:User,
                private authHolder:AuthenticationContextHolder,
                private ea:EventAggregator,
                private router:Router,
                private navigationManager: NavigatorManager
    ) {

    }

    attached() : void {
        $(this.profileDD).dropdown();
        $(this.smallDD).dropdown();

        this.ea.subscribe(SideNavEvents.TOGGLED, response => {
            if (response.navState) {
                this.slideInBreadcrumb();
            } else {
                this.slideOutBreadcrumb();
            }
        });

        this.ea.subscribe('router:navigation:complete', response => {
            this.refresh();
        });
        this.refresh();

    }

    private buildInstructionHierarchy() : Breadcrumb[] {
        let current = this.navigationManager.router,
            results = [];
        while(current) {
            results.push(new Breadcrumb(current, current.currentInstruction));
            current = current.parent;
        }

        return results.reverse();
    }

    private refresh() : void {
        let navigationInstructions = this.buildInstructionHierarchy();
        this.breadcrumbs = navigationInstructions;
    }

    public slideInBreadcrumb() : void {
        this.brandLogo ? this.animator.enter(this.brandLogo) : Promise.resolve(true)
    }

    public slideOutBreadcrumb() : void {
        this.brandLogo ? this.animator.leave(this.brandLogo) : Promise.resolve(true)
    }


    logout() {
        this.authHolder.clear();
        window.location.reload();
    }

    approvals() {
        this.router.parent.navigateToRoute('approvals');
    }



}