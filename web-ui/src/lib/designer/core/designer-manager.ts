

import {Designer} from "./designer";
import {autoinject} from "aurelia-framework";
import {Canvas} from "../canvas/canvas";

@autoinject
export class DesignerManager {

    private currentDesigner : Designer;

    private loading : boolean;

    fire(key: string) : void {
        this.getCurrentCanvas().fire(key);
    }

    setCurrent(designer: Designer) {
        this.currentDesigner = designer;
        if (this.loading) {
            this.currentDesigner.setLoading();
        } else {
            this.currentDesigner.removeLoading();
        }
    }


    public getCurrent() : Designer {
        return this.currentDesigner;
    }

    public getCurrentCanvas() : Canvas {
        return this.currentDesigner.getCanvas();
    }


    undo() : void {
        this.currentDesigner.undo();
    }

    redo() : void {
        this.currentDesigner.redo();
    }

    toggleLoading() : void {
        this.loading = !this.loading;
        if (!this.loading && this.currentDesigner) {
            this.currentDesigner.removeLoading();
        }
    }
}