import {UUID} from 'lib/common/lang';
import {
    bindable,
    autoinject
} from "aurelia-framework";
import {Router} from "aurelia-router";

import {NavigatorManager} from "apps/workspaces/resources/custom-elements/navigator";


@autoinject
export class Navigator {


    @bindable
    private controlId: string;

    @bindable
    private router:Router;

    constructor(private navigatorManager: NavigatorManager) {
        this.controlId = UUID.randomUUID().value;
    }






}