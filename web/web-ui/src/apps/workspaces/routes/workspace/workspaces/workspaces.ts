import {Router} from "aurelia-router";
import {autoinject} from "aurelia-dependency-injection";

@autoinject
export class Workspaces {

    constructor(private router:Router) {
    }


    open(id: string) : void {
        this.router.navigate('4/applications');
    }
}
