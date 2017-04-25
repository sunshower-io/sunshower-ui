

import {Designer} from "./designer";
import {autoinject} from "aurelia-framework";

@autoinject
export class DesignerManager {

    private currentDesigner : Designer;

    setCurrent(designer: Designer) {
        this.currentDesigner = designer;
    }


    public getCurrent() : Designer {
        return this.currentDesigner;
    }

}