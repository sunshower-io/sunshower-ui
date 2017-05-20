import {
    Graph,
    Node, Vertex
} from "lib/common/algorithms/graph/graph";


import {
    Layer,
    mxGraph,
    mxGraphModel
} from "mxgraph";

import {Class, getClass} from 'lib/common/lang';
import {TopologicalSort} from "../../common/algorithms/graph/scheduling";
export interface Encoder<T> {
    encode(t: Vertex<T>): {};
}

export class DefaultEncoder implements Encoder<any> {
    encode(t: Vertex<any>): {} {

        let n = t.data as Layer,
            geo = n.geometry;

        return {
            "node": {
                id: t.id,
                type: getClass(t.data).name,
                layout: {
                    x: geo.x,
                    y: geo.y,
                    w: geo.width,
                    h: geo.height
                }
            }
        }
    }

}

export class JsonCodec {

    encoders: Map<Class<any>, Encoder<any>>;

    private defaultEncoder: Encoder<any>;

    constructor() {
        this.encoders = new Map<Class<any>, Encoder<any>>();
        this.setDefaultEncoder(new DefaultEncoder());
    }

    setDefaultEncoder(encoder: Encoder<any>) {
        this.defaultEncoder = encoder;
    }

    register<T>(type: Class<T>, encoder: Encoder<T>): void {
        this.encoders.set(type, encoder);
    }

    export(model: mxGraphModel, canvas: mxGraph): {} {
        let g = this.buildGraph(model, canvas),
            v = new TopologicalSort().run(g),
            vs = [],
            es = [],
            r = {vertices: vs, edges: es};

        for (let t of v) {
            let encoder = this.encoders.get(getClass(t.data)) || this.defaultEncoder;
            vs.push(encoder.encode(t));
            this.addEdges(es, t);
        }
        return r;
    }

    private addEdges(es: any[], t: Vertex<any>): void {
        for (let k in t.adjacencies) {
            let edge = t.adjacencies[k],
                e = {
                    "edge": {
                        "source": edge.source.id,
                        "target": edge.target.id,
                        "relationship": edge.relationship
                    }
                };
            es.push(e);
        }
    }

    private buildGraph(model: mxGraphModel, canvas: mxGraph): Graph<any> {
        let a = model.getChildCells(canvas.getDefaultParent(), true, true),
            values = {},
            graph = new SerializationGraph();

        for (let cell of a) {
            this.traverse(cell, values, graph);
        }

        for (let cell of a) {
            this.write(cell, {}, values, graph);
        }
        return graph;
    }

    traverse(cell: Layer, values: any, graph: Graph<any>): void {
        if (!values[cell.id]) {
            values[cell.id] = cell;
            if (cell.edges) {
                for (let edge of cell.edges) {
                    this.traverse(edge, values, graph);
                }
            }
            if (cell.children) {
                for (let child of cell.children) {
                    this.traverse(child, values, graph);
                }
            }
        }
    }


    node(n: Layer): Node<any> {
        if (n.isEdge()) {
            throw new Error("no edges");
        }
        return new Node<any>(n.id, n);
    }

    write(cell: Layer, values: any, existing: any, graph: Graph<any>) {
        if (!values[cell.id]) {
            values[cell.id] = cell;
            if (cell.isEdge()) {
                let source = graph.get(cell.source.id)
                        || this.node(existing[cell.source.id]),
                    target = graph.get(cell.target.id)
                        || this.node(existing[cell.target.id]);

                graph.connect(source, target);
                this.write(cell.source, values, existing, graph);
                this.write(cell.target, values, existing, graph);
            } else {
                if (cell.children) {
                    for (let child of cell.children) {
                        if (!graph.get(child.id)) {
                            if (!child.isEdge()) {
                                graph.add(this.node(child));
                            }
                        }
                    }
                }
            }
        }

        if (cell.children) {
            for (let c of cell.children) {
                this.write(c, values, existing, graph);
            }
        }

        if (cell.edges) {
            for (let e of cell.edges) {
                this.write(e, values, existing, graph);
            }
        }
    }

}


export class SerializationGraph extends Graph<any> {

}
