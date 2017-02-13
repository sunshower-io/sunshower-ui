import {User} from '../../../model/core/security/user';
import {bindable, inject} from 'aurelia-framework'

@inject(User)
export class Profile {

    @bindable
    private editingUser = false;

    @bindable
    private editingPassword = false;

    @bindable
    private expiredUser = false;

    @bindable
    private lockedUser = false;

    constructor(private user:User) {

    }

    editUser() {
        this.editingUser = true;
    }

    saveUser() {
        this.editingUser = false;
        //TODO actually save the user
    }

    editPassword() {
        this.editingPassword = true;
    }

    savePassword() {
        this.editingPassword = false;
        //TODO actually update the password if they match
    }
}