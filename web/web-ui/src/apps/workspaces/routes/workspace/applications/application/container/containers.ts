import {Router} from "aurelia-router";
import {autoinject} from "aurelia-framework";

@autoinject
export class Containers {

    constructor(private router:Router) {

    }


    openContainer(): void {
        this.router.navigate('container/22');
    }
}