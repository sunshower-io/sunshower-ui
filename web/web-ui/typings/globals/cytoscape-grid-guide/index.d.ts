declare module GridGuide {

    interface Static {
        (options?:any) : void;
    }


}

declare module "cytoscape-grid-guide" {
    export = gridGuide;
}

declare var gridGuide: GridGuide.Static;