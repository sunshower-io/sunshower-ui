import 'jquery';
import {
    User,
    AuthenticationContextHolder
} from 'lib/common/security';
import { EventAggregator } from 'aurelia-event-aggregator';
import {autoinject} from "aurelia-framework";
import {VelocityAnimator} from "aurelia-animator-velocity";
// import {Router} from "aurelia-router";
 import {Router} from "aurelia-router";
import {UUID} from 'lib/common/lang';
import {bindable} from "aurelia-framework";

@autoinject
export class Navbar {

    @bindable
    private dropdownId               : string       =  UUID.random();
    private smallddId                : string       = UUID.random();
    private profileDD               : HTMLElement;
    private smallDD                 : HTMLElement;
    private brandLogo               : HTMLElement;

    constructor(private animator: VelocityAnimator,
        private user:User,
        private authHolder:AuthenticationContextHolder,
        private ea:EventAggregator,
        private router:Router
    ) {

    }

    attached() : void {
        $(this.profileDD).dropdown();
        $(this.smallDD).dropdown();

        this.ea.subscribe('sideNav', response => {
            if (response.navState) {
                this.slideInBreadcrumb();
            } else {
                this.slideOutBreadcrumb();
            }
        });
    }

    public slideInBreadcrumb() : void {
        this.brandLogo ? this.animator.enter(this.brandLogo) : Promise.resolve(true)
    }

    public slideOutBreadcrumb() : void {
        this.brandLogo ? this.animator.leave(this.brandLogo) : Promise.resolve(true)
    }

    profile() {
        // this.router.navigateToRoute('profile');
    }

    logout() {
        this.authHolder.clear();
        window.location.reload();
    }

    openSettings() {
        // location.assign('#/admin');
    }

    approvals() {
        this.router.parent.navigateToRoute('approvals');
    }

}