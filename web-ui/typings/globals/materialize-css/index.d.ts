interface SidenavOptions {
}

interface CollapsibleOptions {
}

interface DropdownOptions {
}

interface ModalOptions {
}

interface SelectOptions {}

interface JQuery {
    sideNav(opts ?: SidenavOptions) : JQuery;
    collapsible(opts ?: CollapsibleOptions) : JQuery;
    dropdown(opts ?: DropdownOptions) : JQuery;
    modal(opts?: ModalOptions, method ?: string) : JQuery;
    tabs(...opts:any[]);
    material_select(options ?: SelectOptions) : JQuery;
}

interface MaterializeConstructor {
    new() : JQuery;
    updateTextFields() : void;
}


declare var Materialize : MaterializeConstructor;

declare module 'materialize-css' {

    export module Materialize {
        function toast(value:string, time:number, style?:string) : void;
    }




}