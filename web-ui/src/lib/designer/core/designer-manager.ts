

import {Designer} from "./designer";
import {autoinject} from "aurelia-framework";
import {Canvas} from "../canvas/canvas";

@autoinject
export class DesignerManager {

    private currentDesigner : Designer;

    setCurrent(designer: Designer) {
        this.currentDesigner = designer;
    }


    public getCurrent() : Designer {
        return this.currentDesigner;
    }

    public getCurrentCanvas() : Canvas {
        return this.currentDesigner.getCanvas();
    }

}