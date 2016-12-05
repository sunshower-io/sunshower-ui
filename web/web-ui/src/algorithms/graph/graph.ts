
export interface Traversal<T, U> {
    run(g:Graph<U>) : T;
}


enum Relationship {
    Parent,
    Child
}

export class Edge<T> {

    constructor(
        public source:Node<T>,
        public target:Node<T>,
        public relationship?:Relationship
    ) {

    }
}


export class Node<T> {
    adjacencies: {[key:string]:Edge<T>};

    constructor(public id:string, public data?:T) {
        this.adjacencies = {};
    }

    add(edge:Edge<T>) : boolean {
        if(this.adjacencies[edge.target.id]) {
            return false;
        }
        this.adjacencies[edge.target.id] = edge;
        return true;
    }

    remove(target:Node<T> ) : boolean {
        let t = this.adjacencies[target.id];
        if(t) {
            delete this.adjacencies[target.id];
            return true;
        }
        return false;
    }


    toString() : string {
        let result = `${this.id} -> `;
        for(let k in this.adjacencies) {
            result += k + ',';
        }
        return result;
    }
}

export class Graph<T> {

    public nodes:{[key:string]:Node<T>};

    add(node:Node<T>) : boolean {
        this.check();
        this.nodes[node.id] = node;
        return true;
    }

    remove(id:string) : Node<T> {
        let result = this.nodes[id];
        delete this.nodes[id];
        return result;
    }

    disconnect(s:Node<T>, t:Node<T>) : boolean {
        this.check();
        let source = this.nodes[s.id] || s,
            target = this.nodes[t.id] || t;
        return source.remove(target);
    }

    connect(
        s:Node<T>,
        t:Node<T>,
        relationship?:Relationship
    ) : boolean {
        this.check();
        let source = this.nodes[s.id] || s,
            target = this.nodes[t.id] || t;

        let edge = new Edge<T>(source, target, relationship);
        this.nodes[source.id] = source;
        this.nodes[target.id] = target;
        return source.add(edge);
    }

    get(id:string) : Node<T> {
        return this.nodes[id];
    }

    getNodes() : Node<T>[] {
        let result = [];
        for(let k in this.nodes) {
            result.push(this.nodes[k]);
        }
        return result;
    }


    neighbors(source:Node<T>) : Node<T>[] {
        let s = this.nodes[source.id];
        if(s) {
            let neighbors = s.adjacencies,
                results = [];
            for(let key in neighbors) {
                results.push(neighbors[key].target);
            }
            return results;
        } else {
            return [];
        }
    }

    private check() {
        if(!this.nodes) {
            this.nodes = {};
        }
    }

    toString() : string {
        let result = '';
        for(let key in this.nodes) {
            let node = this.nodes[key];
            result += "\n\t" + node.toString();
        }
        return result;
    }

}