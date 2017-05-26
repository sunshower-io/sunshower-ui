
import {Edge} from './edge';
import {Vertex} from "./vertex";

export class TaskGraph {

    edges           : Edge[];

    vertices        : Vertex[];



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