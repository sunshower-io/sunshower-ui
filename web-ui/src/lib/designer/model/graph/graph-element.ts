
import {Edge} from './edge';
import {Vertex} from "./vertex";

export class TaskGraph {

    edges           : Edge[];

    vertices        : Vertex[]



    addVertex(v: Vertex) : void {
        if(!this.vertices) {
            this.vertices = [];
        }
        this.vertices.push(v);
    }




}