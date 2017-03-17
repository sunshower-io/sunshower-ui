import {bindable, inject } from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class Sidenav {

    @bindable
    private icon:Element;


    private showing:boolean = true;

    @bindable
    private menu:Element;

    constructor(private router:Router) {

    }

    toggle() {
        if(this.showing) {
            this.hide();
        } else {
            this.show();
        }
        this.showing = !this.showing;
    }

    hide() : void {
        $(this.menu).addClass('icon');
        $(this.icon).removeClass('left');
        $(this.icon).addClass('right');
    }

    show() : void {
        $(this.menu).removeClass('icon');

        $(this.icon).addClass('left');
        $(this.icon).removeClass('right');

    }

    attached() : void {
        console.log("GOT", this.router);


    }
}