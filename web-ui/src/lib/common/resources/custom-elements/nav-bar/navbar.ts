import 'jquery';
import {
    User,
    AuthenticationContextHolder
} from 'lib/common/security';
import {autoinject} from "aurelia-framework";
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

    constructor(
        private user:User,
        private authHolder:AuthenticationContextHolder,
        private router:Router
    ) {
        //make sure we get the right router
    }

    attached() : void {
        $(this.profileDD).dropdown();
        $(this.smallDD).dropdown();
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
        //todo change route
        this.router.navigateToRoute('approvals');
        // location.assign('#/approvals');
    }

}