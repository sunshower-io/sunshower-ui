
import {Edge} from './edge';
import {Vertex} from "./vertex";

export class CanvasLayout {
    x               : number;
    y               : number;
    translateX      : number;
    translateY      : number;
}


export class TaskGraph {

    edges           : Edge[];

    vertices        : Vertex[];

    layout          : CanvasLayout;



    constructor(o?: any) {
        Object.assign(this, o);
        this.vertices = [];

        if (o.vertices) {
            for (let i = 0; i < o.vertices.length; i++) {
                this.vertices.push(new Vertex(o.vertices[i]))
            }
        }
    }


    addEdge(e: Edge) : void {
        if(!this.edges) {
            this.edges = [];
        }
        this.edges.push(e);
    }


    addVertex(v: Vertex) : void {
        if(!this.vertices) {
            this.vertices = [];
        }
        this.vertices.push(v);
    }

}