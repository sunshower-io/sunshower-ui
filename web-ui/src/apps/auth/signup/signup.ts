import {UUID} from "lib/common/lang";
import {Router} from "aurelia-router";
import {bindable, autoinject} from "aurelia-framework";
import {SignupService} from "lib/common/security/service/signup";
import {RegistrationRequest} from "lib/common/security/model/user";

@autoinject
export class Signup {

    private firstnameId: string      =  UUID.random();
    private lastnameId: string       =  UUID.random();
    private usernameId: string       =  UUID.random();
    private emailId: string          =  UUID.random();
    // private phoneId: string          = UUID.random();
    private passwordId: string       =  UUID.random();
    private confirmId: string        =  UUID.random();

    private passwordInput: HTMLInputElement;
    private confirmPasswordInput: HTMLInputElement;

    private password: string;
    private confirmPassword: string;
    private validationClass: string;
    // private phoneValidationClass: string;

    @bindable
    private showError:boolean;

    @bindable
    private error: string;

    @bindable
    private showSuccess:boolean;


    @bindable
    private user: RegistrationRequest = new RegistrationRequest();


    constructor(
        private router:Router,
        private signupService:SignupService
    ) {
    }

    signup(): void {
        this.showError = false;

        if (this.checkPasswords()) {
            this.user.password = this.password;
            this.signupService.create(this.user).then(response => {
                this.showSuccess = true;
            }).catch(er => {
                this.showError = true;
                this.error = er.statusText;
            });
        } else {
            this.error = '';
            if (!this.checkPasswords()) {
                this.error = this.error + 'Please enter and confirm a password.'
            }
            this.showError = true;
        }
    }

    signIn() : void {
        this.router.navigateToRoute('login')
    }

    checkPasswords() : boolean {
        if (this.password == this.confirmPassword && this.password) {
            this.validationClass = 'valid';
            return true;
        } else if (this.password == '') {
            this.validationClass = '';
            return false;
        } else {
            this.validationClass = 'invalid';
            return false;
        }
    }

    // checkPhoneNumber() : boolean {
    //     if (this.user.phoneNumber == '') {
    //         this.phoneValidationClass = '';
    //         return false;
    //     } else {
    //         let length = this.user.phoneNumber.replace(/[^0-9a-z]/gi, '').length;
    //         // any more involved check locks us out of getting international numbers,
    //         // unless we want to pull in
    //         // https://github.com/googlei18n/libphonenumber
    //         // which we may
    //         if (length >= 9) {
    //             this.phoneValidationClass = 'valid';
    //             return true;
    //         } else {
    //             this.phoneValidationClass = 'invalid';
    //             return false;
    //         }
    //     }
    // }

}