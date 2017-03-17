declare module NodeResize {
    interface Static {
        (cytoscape:any, jquery:any, canvas:any)

    }
}

declare module 'cytoscape-node-resize' {
    export = nodeResize;
}

declare var nodeResize: NodeResize.Static;