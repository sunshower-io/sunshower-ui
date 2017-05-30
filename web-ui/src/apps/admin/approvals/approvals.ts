import { autoinject, bindable } from 'aurelia-framework';
import {SignupService} from "lib/common/security/service/signup";
import {RegistrationRequest, Principal as User} from "lib/common/security/model/user";

@autoinject
export class Approvals {

    approvals: RegistrationRequest[];
    users: User[];

    @bindable
    loading: boolean;

    roles = 'admin';

    constructor(private signupService: SignupService) {
        this.approvals = [];
        this.users = []
    }

    attached() {
        this.getPending();
    }

    getPending() : void {
        this.loading = true;
        this.signupService.listPending()
            .then(response => {
                this.approvals = response;
                this.getActive();
                this.loading = false;
            });
    }

    getActive() : void {
        this.loading = true;
        this.signupService.listActive()
            .then(response => {
                this.users = response;
                this.loading = false;
            });
    }

    approve(requestId : string) : void {
        this.loading = true;
        this.signupService.approve(requestId)
            .then(response => {
                this.getPending()}
            );
    }

    revoke(userId: string) : void {
        this.loading = true;
        this.signupService.revoke(userId)
            .then(response => {
                this.getActive()
            })

    }



}