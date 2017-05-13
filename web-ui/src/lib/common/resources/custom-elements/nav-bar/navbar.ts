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
                private router:Router
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
            this.breadcrumbs = this.buildBreadcrumb(this.router.currentInstruction)
                .sort(function(a,b) {return (a.href.length > b.href.length) ? 1 : ((b.href.length > a.href.length) ? -1 : 0);} );
            //I acknowledge that there are certainly better ways to sort them, but I can't determine it at the moment and this works
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

    //inspired by _buildTitle on NavigationInstruction in aurelia-router
    buildBreadcrumb(instruction : NavigationInstruction) : any[] {

        let breadcrumbs = [];
        let childCrumbs = [];

        if (instruction.config.navModel.title) {
            breadcrumbs.push({
                title: instruction.router.transformTitle(instruction.config.navModel.title),
                href: '#' + instruction.config.navModel.router.baseUrl + instruction.config.navModel.relativeHref
            });
        }

        for (let viewPortName in instruction.viewPortInstructions) {
            let _viewPortInstruction = instruction.viewPortInstructions[viewPortName];

            //todo fix ordering

            if (_viewPortInstruction.childNavigationInstruction) {
                let childRoute = this.buildBreadcrumb(_viewPortInstruction.childNavigationInstruction);
                if (childRoute) {
                    for (let route in childRoute) {
                        // console.log(childRoute);
                        breadcrumbs.push(childRoute[route]);
                        childCrumbs.push(childRoute[route]);
                    }
                }
            }
        }

        if ((instruction.router as any).title) {
            breadcrumbs.push({
                title: instruction.router.transformTitle((instruction.router as any).title),
                href: '#' + instruction.router.baseUrl + instruction.router.currentInstruction.params.workspaceId
            });
        }

        console.log('breadcrumbs', breadcrumbs);
        console.log('childcrumbs', childCrumbs);
        return breadcrumbs;
    };


}