import 'jquery';
import {User} from '../../model/core/security/user';
import {inject} from "aurelia-framework";
@inject(User)
export class ProfileDropdown {

    constructor(private user:User) {

    }

    attached() {
        $('.ui.dropdown').dropdown();
    }

}