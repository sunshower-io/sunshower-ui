export interface Traversal<T, U> {
    run(g: Graph<U>): T;
}


type Relationship = Symbol | string | number;


export interface Edge<T> {

    source          :Node<T>;
    target          :Node<T>;
    relationship    :Relationship;

}


export interface Vertex<T> {

    data?: T;

    id: string;

    adjacencies: {[key:string]: Edge<T>};

    addEdge(edge: Edge<T>): boolean;

    removeEdge(edge: Edge<T>): boolean;

    removeSuccessor(successor:Node<T>) : boolean;

    addSuccessor(successor:Node<T>) : boolean;


    createEdge(
        source: Node<T>,
        target: Node<T>
    ) : Edge<T>;

}


export abstract class Node<T> implements Vertex<T> {
    adjacencies: {[key: string]: Edge<T>};

    constructor(public id: string, public data?: T) {
        this.adjacencies = {};
    }

    abstract createEdge(
        source: Node<T>,
        target: Node<T>
    ) : Edge<T>;


    addSuccessor(successor: Node<T>): boolean {
        if(this.adjacencies[successor.id]) {
            return false;
        }
        this.adjacencies[successor.id] = this.createEdge(this, successor);
    }

    addEdge(edge: Edge<T>): boolean {
        if (this.adjacencies[edge.target.id]) {
            return false;
        }
        this.adjacencies[edge.target.id] = edge;
        return true;
    }

    removeSuccessor(successor:Node<T>) : boolean {
        let t = this.adjacencies[successor.id];
        if (t) {
            delete this.adjacencies[successor.id];
            return true;
        }
        return false;
    }

    removeEdge(target: Edge<T>): boolean {
        return this.removeSuccessor(target.target);
    }


    toString(): string {
        let result = `${this.id} -> `;
        for (let k in this.adjacencies) {
            result += k + ',';
        }
        return result;
    }
}

export abstract class Graph<T> {

    public nodes: {[key: string]: Node<T>};

    add(node: Node<T>): boolean {
        this.check();
        this.nodes[node.id] = node;
        return true;
    }

    remove(id: string): Node<T> {
        let result = this.nodes[id];
        delete this.nodes[id];
        return result;
    }

    abstract createEdge(
        source:Node<T>,
        target:Node<T>,
        relationship:Relationship
    ) : Edge<T>;

    disconnect(s: Node<T>, t: Node<T>): boolean {
        this.check();
        let source = this.nodes[s.id] || s,
            target = this.nodes[t.id] || t;
        return source.removeSuccessor(target);
    }

    connect(s: Node<T>,
            t: Node<T>,
            relationship?: Relationship): boolean {
        this.check();
        let source = this.nodes[s.id] || s,
            target = this.nodes[t.id] || t;

        let edge = this.createEdge(source, target, relationship);
        this.nodes[source.id] = source;
        this.nodes[target.id] = target;
        return source.addEdge(edge);
    }

    get(id: string): Node<T> {
        return this.nodes[id];
    }

    getNodes(): Node<T>[] {
        let result = [];
        for (let k in this.nodes) {
            result.push(this.nodes[k]);
        }
        return result;
    }


    neighbors(source: Node<T>): Node<T>[] {
        let s = this.nodes[source.id];
        if (s) {
            let neighbors = s.adjacencies,
                results = [];
            for (let key in neighbors) {
                results.push(neighbors[key].target);
            }
            return results;
        } else {
            return [];
        }
    }

    private check() {
        if (!this.nodes) {
            this.nodes = {};
        }
    }

    toString(): string {
        let result = '';
        for (let key in this.nodes) {
            let node = this.nodes[key];
            result += "\n\t" + node.toString();
        }
        return result;
    }

}