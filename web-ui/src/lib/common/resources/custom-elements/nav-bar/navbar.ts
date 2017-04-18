import 'jquery';
import {
    User,
    AuthenticationContextHolder
} from 'lib/common/security';
import {autoinject} from "aurelia-framework";
// import {Router} from "aurelia-router";
import {UUID} from 'lib/common/lang';
import {bindable} from "aurelia-framework";

@autoinject
export class Navbar {

    @bindable
    private controlId               : string       =  UUID.random();
    private profileDD               : HTMLElement;

    constructor(
        private user:User,
        private authHolder:AuthenticationContextHolder
    ) {

    }

    attached() : void {
        $(this.profileDD).dropdown();
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

}