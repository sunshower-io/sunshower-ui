declare module 'mxgraph' {

    export class State {

    }
    export class Canvas {

    }

    export class mxSvgCanvas2D {
        constructor(root:XmlDocument);
    }

    export class mxImageExport {

        includeOverlays         : boolean;


        drawState(state:State, canvas:Canvas) : void;


    }
}