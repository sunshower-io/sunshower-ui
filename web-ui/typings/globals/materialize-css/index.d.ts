interface SidenavOptions {

}

interface JQuery {
    sideNav(opts ?: SidenavOptions) : JQuery;
}

interface MaterializeConstructor {
    new() : JQuery;

}


declare var Materialize : MaterializeConstructor;

declare module 'materialize-css' {
    export = Materialize;



}