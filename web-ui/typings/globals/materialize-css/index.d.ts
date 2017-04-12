interface SidenavOptions {

}

interface CollapsibleOptions {

}

interface JQuery {
    sideNav(opts ?: SidenavOptions) : JQuery;
    collapsible(opts ?: CollapsibleOptions) : JQuery;
}

interface MaterializeConstructor {
    new() : JQuery;

}


declare var Materialize : MaterializeConstructor;

declare module 'materialize-css' {
    export = Materialize;



}