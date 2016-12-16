
import {bindable} from "aurelia-framework";



@bindable
export class Menu {
    items       : MenuItem[];
    context     : OperationContext;
}

export interface OperationContext {

}

export interface MenuItem {
    style       : string;
    name        : string;
    menus       : MenuItem[];

    apply(editor:OperationContext) : void;
}
