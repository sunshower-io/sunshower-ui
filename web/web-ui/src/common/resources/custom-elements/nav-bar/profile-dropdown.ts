import 'jquery';
import {
    User,
    AuthenticationContextHolder
} from 'common/model/security';
import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(User, Router, AuthenticationContextHolder)
export class ProfileDropdown {


    constructor(
        private user:User,
        private router:Router,
        private authHolder:AuthenticationContextHolder
    ) {

    }


    attached() {
        $('.ui.dropdown').dropdown();
    }


    profile() {
        this.router.navigateToRoute('profile');
    }

    logout() {
        this.authHolder.clear();
        window.location.reload();
    }

    openSettings() {
        location.assign('#/admin');
    }
}