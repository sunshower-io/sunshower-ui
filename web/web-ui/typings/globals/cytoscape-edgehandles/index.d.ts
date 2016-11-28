declare module EdgeHandles {
    interface Static {
        (options?:any) : void;
    }
}

declare module 'cytoscape-edgehandles' {
    export = edgehandles;
}

declare var edgehandles:EdgeHandles.Static;