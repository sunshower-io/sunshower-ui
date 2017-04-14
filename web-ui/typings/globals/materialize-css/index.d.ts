interface SidenavOptions {

}

interface CollapsibleOptions {

}

interface DropdownOptions {

}

interface JQuery {
    sideNav(opts ?: SidenavOptions) : JQuery;
    collapsible(opts ?: CollapsibleOptions) : JQuery;
    dropdown(opts ?: DropdownOptions) : JQuery;
}

interface MaterializeConstructor {
    new() : JQuery;

}


declare var Materialize : MaterializeConstructor;

declare module 'materialize-css' {
    export = Materialize;


}