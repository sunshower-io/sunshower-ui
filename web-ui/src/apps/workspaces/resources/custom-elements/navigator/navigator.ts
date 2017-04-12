import 'materialize-css';
import 'mdi/css/materialdesignicons.css!'
import {UUID} from "common/lib/utils/uuid";
import {
    autoinject,
    bindable
} from 'aurelia-framework';
import {NavigatorLevel} from "./navigator-element";
import {Router} from "aurelia-router";

@autoinject
export class Navigator {

    @bindable
    private router                  : Router;


    private controlId               : string       =  UUID.random();

    private navigator               : HTMLElement;
    private navigatorControl        : HTMLElement;

    private currentLevel            : NavigatorLevel;


    constructor() {
    }


    open() : void {

    }

    close() : void {

    }

    attached() : void {
        console.log("NAV",  this.router);
        $(this.navigatorControl).sideNav();
        $(document).ready(function(){
            $('.collapsible').collapsible();
        });
    }

}