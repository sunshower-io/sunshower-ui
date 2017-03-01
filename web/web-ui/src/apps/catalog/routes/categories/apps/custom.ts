/**
 * Created by dustinlish on 2/27/17.
 */
import {Catalog} from "apps/catalog/index";
import {autoinject} from "aurelia-dependency-injection";

@autoinject
export class Custom {

    constructor(private parent: Catalog) {
    }

    open() : void {
        this.parent.router.navigate('/workspace/4/applications/4/application')
    }
}