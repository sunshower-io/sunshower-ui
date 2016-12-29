import {
    Layer,
    mxCell,
    Renderable,
    SceneGraphElement
} from 'mxgraph';
import {mixin} from "aurelia-metadata";
import {Vertex, Edge} from "algorithms/graph/graph";


type Properties = {[key: string]: any};

export interface Element extends SceneGraphElement, Renderable, Layer {

}







type PropertyNode = Vertex<Properties>;

export class Relationship implements Edge<Properties> {
    constructor(
        public source:PropertyNode,
        public target:PropertyNode,
        public relationship:number) {
        this.relationship = relationship;

    }

}

export abstract class AbstractElement
    extends mxCell
    implements Element,
        Vertex<Properties>
{

    adjacencies: {[key: string]: Edge<Properties> };

    constructor(public id: string, public data?: Properties) {
        super();
        this.adjacencies = {};
    }

    abstract createEdge(source: PropertyNode,
                                  target: PropertyNode
    ): Relationship;

    add(edge: Relationship): boolean {
        if (this.adjacencies[edge.target.id]) {
            return false;
        }
        this.adjacencies[edge.target.id] = edge;
        return true;
    }


    addSuccessor(successor: PropertyNode): boolean {
        if (this.adjacencies[successor.id]) {
            return false;
        }
        this.adjacencies[successor.id] = this.createEdge(this, successor);
    }

    remove(target: Relationship): boolean {
        return this.removeSuccessor(target.target);
    }

    removeSuccessor(successor: PropertyNode): boolean {
        let t = this.adjacencies[successor.id];
        if (t) {
            delete this.adjacencies[successor.id];
            return true;
        }
        return false;
    }





    toString(): string {
        let result = `${this.id} -> `;
        for (let k in this.adjacencies) {
            result += k + ',';
        }
        return result;
    }




}

