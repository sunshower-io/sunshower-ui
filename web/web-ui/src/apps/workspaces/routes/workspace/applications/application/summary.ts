import {bindable, autoinject} from "aurelia-framework";
import {OperatingSystemService} from "common/model/api/hal/os";
/**
 * Created by dustinlish on 2/20/17.
 */

@autoinject
export class Summary {

    requirementDD       : HTMLElement;
    requirementPopup    : HTMLElement;

    @bindable
    popupState          : string;

    @bindable
    deployer            : string;

    @bindable
    os                  : string;



    constructor(private osService:OperatingSystemService) {

    }

    attached() : void {
        $(this.requirementDD).dropdown();
    }

    openPopup(state: string) : void {
        this.popupState = state;
        console.log(state);
        $(this.requirementPopup).modal('show');
        //todo set closePopup as a callback -- having issues w/ void
    }

    closePopup() : void {
        this.popupState = '';
        $(this.requirementPopup).modal('hide');
        $(this.requirementDD).find('.active').removeClass('active');
    }

    selectDeployer(deployer: string) : void {
        this.deployer = deployer;
        this.closePopup();
    }

    selectOS(os: string) : void {
        this.os = os;
        this.closePopup();
    }

}