import {UUID} from 'lib/common/lang';
import {
    bindable,
    autoinject
} from "aurelia-framework";
import 'materialize-css';
import 'mdi/css/materialdesignicons.css!'

import {Router} from "aurelia-router";

import {NavigatorManager} from "apps/workspaces/resources/custom-elements/navigator";


@autoinject
export class Navigator {


    @bindable
    private controlId               : string;

    private navigationControl       : HTMLElement;

    constructor(private navigatorManager: NavigatorManager) {
        this.controlId = UUID.randomUUID().value;
    }

    public attached() : void {
        $(this.navigationControl).sideNav();

    }
}