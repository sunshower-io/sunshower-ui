import {
    Layer,
    mxCell,
    mxCellOverlay, mxGeometry
} from 'mxgraph';

import {Canvas} from "lib/designer/canvas";
import {Identifier} from "lib/common/lang/identifier";
import {Vertex} from "./graph/vertex";



export class Overlay extends mxCellOverlay {

}

export interface Drawable extends Layer {

    labelVisible : boolean;
    labelClass   : string;

    getLabel() : string;
    overlays() : Overlay[];
    addTo(canvas: Canvas) : boolean;
}



export abstract class RenderableElement extends mxCell implements Drawable {

    labelVisible            : boolean  = true;
    labelClass              : string = 'default-label';

    constructor(
        label: string,
        x:number,
        y:number,
        width:number,
        height:number
    ) {
        super(label, new mxGeometry(x, y, width, height));
    }

    getLabel() : string {
        return Identifier.newId();
    }




    overlays() : Overlay[] {
        return [];
    }

    addTo(canvas:Canvas) : boolean {
        canvas.getModel().beginUpdate();
        try {
            this.doInsert(canvas);
        } finally {
            canvas.getModel().endUpdate();
        }
        return true;
    }

    protected doInsert(canvas: Canvas) : void {
        canvas.addCell(this, null);
    }


    addChild(v:RenderableElement) : void {
        v.setParent(this);
        if(!this.children) {
            this.children = [];
        }
        this.children.push(v);
    }
}

export abstract class Edge extends mxCell {
    constructor(
        public source: RenderableVertex,
        public target: RenderableVertex
    ) {
        super();
        this.id = Identifier.newId();
    }

}


export abstract class RenderableVertex extends RenderableElement {

    graph_vertex: Vertex;

    constructor(
        label: string,
        x:number,
        y:number,
        width:number,
        height:number
    ) {
        super(label, x, y, width, height);
        this.setVertex(true);
        this.id = Identifier.newId();

        this.graph_vertex = new Vertex();
    }
}
