import 'jquery';
import {User} from '../../model/core/security/user';
import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {AuthenticationContextHolder} from "../../model/core/security/token";
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

    logout() {
        this.authHolder.clear();
        window.location.reload();
    }
}