import {Class} from "lang/class";

export class Widget {

    viewModel: Class<any>;
}


export interface WidgetView {
    container:HTMLElement;


    list() : Widget;
    add(widget:Widget) : void;
}