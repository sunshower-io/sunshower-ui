/**
 * Created by dustinlish on 2/27/17.
 */
import {Catalog} from "apps/catalog/index";
import {autoinject} from "aurelia-dependency-injection";

@autoinject
export class Custom {

    constructor(private parent: Catalog) {
    }

    activate(id: any, p:any, q:any) {
        console.log("Got", id)
        console.log("Got", p)
        console.log("Got", q)
    }

    open() : void {
        this.parent.router.navigate('/workspace/4/applications/4/application')
    }
}