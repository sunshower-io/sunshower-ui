import 'jquery';
import {
    User,
    AuthenticationContextHolder
} from 'common/model/security';
import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature"
import {UUID} from "common/lib/utils/uuid";
import {bindable} from "aurelia-framework";

@inject(User, Router, AuthenticationContextHolder, IncompleteFeature)
export class ProfileDropdown {

    @bindable
    private controlId               : string       =  UUID.random();
    private profileDD               : HTMLElement;

    constructor(
        private user:User,
        private router:Router,
        private authHolder:AuthenticationContextHolder,
        private incompleteFeature: IncompleteFeature
    ) {

    }


    attached() : void {
        $(this.profileDD).dropdown(); //todo figure out why not working
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