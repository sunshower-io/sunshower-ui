import 'jquery';
import {
    User,
    AuthenticationContextHolder
} from 'lib/common/security';
import { EventAggregator } from 'aurelia-event-aggregator';
import {autoinject} from "aurelia-framework";
import {VelocityAnimator} from "aurelia-animator-velocity";
import {Router, NavigationInstruction} from "aurelia-router";
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

        this.ea.subscribe('sideNav', response => {
            if (response.navState) {
                this.slideInBreadcrumb();
            } else {
                this.slideOutBreadcrumb();
            }
        });

        this.breadcrumbs = this.buildBreadcrumb(this.router.currentInstruction).reverse();
        //todo update when viewModel changes
        console.log(this.breadcrumbs);

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

        if (instruction.config.navModel.title) {
            breadcrumbs.push({
                title: instruction.router.transformTitle(instruction.config.navModel.title),
                href: '#' + instruction.config.navModel.router.baseUrl + instruction.config.navModel.relativeHref
            });
        }

        for (let viewPortName in instruction.viewPortInstructions) {
            let _viewPortInstruction = instruction.viewPortInstructions[viewPortName];

            if (_viewPortInstruction.childNavigationInstruction) {
                let childRoute = this.buildBreadcrumb(_viewPortInstruction.childNavigationInstruction);
                if (childRoute) {
                    for (let route in childRoute) {
                        breadcrumbs.push(childRoute[route]);
                    }
                }
            }
        }

        if ((instruction.router as any).title) {
            //todo fix when we have nested routers
            breadcrumbs.push({
                title: instruction.router.transformTitle((instruction.router as any).title),
                href: '#' + instruction.router.baseUrl + instruction.router.currentInstruction.params.workspaceId
            });
            console.log('instruction.router', instruction.router);
        }

        return breadcrumbs;
    };


}