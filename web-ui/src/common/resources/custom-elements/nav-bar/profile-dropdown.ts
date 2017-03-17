import 'jquery';
import {
    User,
    AuthenticationContextHolder
} from 'common/model/security';
import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature"

@inject(User, Router, AuthenticationContextHolder, IncompleteFeature)
export class ProfileDropdown {


    constructor(
        private user:User,
        private router:Router,
        private authHolder:AuthenticationContextHolder,
        private incompleteFeature: IncompleteFeature
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