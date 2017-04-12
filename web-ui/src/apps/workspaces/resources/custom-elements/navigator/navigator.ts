import 'materialize-css';
import 'mdi/css/materialdesignicons.css!'
import {UUID} from "common/lib/utils/uuid";
import {
    autoinject,
    bindable
} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {NavigationContext, ElementGroup} from "./navigator-element";

@autoinject
export class Navigator {


    private controlId               : string       =  UUID.random();

    private navigator               : HTMLElement;
    private navigatorControl        : HTMLElement;

    @bindable
    private context                 : NavigationContext;

    @bindable
    private groups                  : ElementGroup[];



    constructor() {
    }



    open() : void {

    }

    close() : void {

    }

    contextChanged(newVal: NavigationContext, old: NavigationContext) {
        newVal.load().then(t => {
            this.groups = newVal.children;
            console.log("Groups", this.groups);
        });
    }

    attached() : void {
        $(this.navigatorControl).sideNav();
        $(document).ready(function(){
            $('.collapsible').collapsible();
        });
    }

}