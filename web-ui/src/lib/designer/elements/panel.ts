

import {
    bindable,
    autoinject,
    customElement
} from "aurelia-framework";
import {UUID} from "lib/common/lang/uuid";
import {Compose} from "aurelia-templating-resources";

@autoinject
@customElement('panel')
export class Panel {

    @bindable
    public  id                  : string;

    @bindable
    private name                : string;

    @bindable
    private viewModel           :  string;

    @bindable
    private contents            : Compose;

    @bindable
    public  active              : boolean;

    @bindable
    private model               : any;

    @bindable
    public icon                 : string;


    private currentViewModel    : PanelAware;

    constructor(element:Element) {
        this.id = UUID.random();
    }



    attached() : void {
        // this.currentViewModel = (<any> this.contents).currentViewModel;
        // this.name = this.currentViewModel.name;
    }



}

export interface PanelAware {
    active              : boolean;
    name                : string;
    navIcon             : string;
}