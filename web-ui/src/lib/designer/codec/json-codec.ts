import * as _ from 'lodash';

import {
    Graph,
    Node,
    Vertex
} from "lib/common/algorithms/graph/graph";


import {
    Layer,
    mxGraph,
    mxGraphModel
} from "mxgraph";

import {Class, getClass} from 'lib/common/lang';
import {
    TopologicalSort
} from "lib/common/algorithms/graph/scheduling";


import {
    TaskGraph
} from 'lib/designer/model/graph';

import {Canvas} from "lib/designer/canvas/canvas";


export interface Encoder<T> {
    encode(t: Vertex<T>): {};
}

export class DefaultEncoder implements Encoder<any> {
    encode(t: Vertex<any>): {} {

        let n = t.data as Layer,
            geo = n.geometry;

        return {
            id: t.id,
            type: getClass(t.data).name,
            layout: {
                x: geo.x,
                y: geo.y,
                width: geo.width,
                height: geo.height
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


    resolveRoots(g: TaskGraph, canvas: Canvas): Layer[] {

        let nodes = _.reduce(g.vertices, (m, v) => {
                if (!m[v.id]) {
                    let e = canvas
                        .resolveElementLoader(v.type)
                        .load(canvas, v);
                    m[v.id] = {id: v.id, value: e}
                }
                return m;
            }, {}),
            parentEdges = (g.edges || []).filter(t => t.relationship === 'parent'),
            edges = _.reduce(parentEdges, (m, e) => {
                m[e.id] = e;
                return e;
            }, {}),
            roots = _.map(_.values(nodes), (node) => {
                let n = node as GraphElement,
                    e = edges[n.id];
                if (e) {
                    let p = nodes[e.target],
                        c = nodes[e.source];
                    p.addChild(c);
                    return [parent];
                } else {
                    return [node];
                }
            });
        return (roots as any) as Layer[];
    }

    import(canvas: Canvas, graph: TaskGraph): void {

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
                    "source": edge.source.id,
                    "target": edge.target.id,
                    "relationship": edge.relationship
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

    write(cell: Layer, values: any, existing: any, graph: Graph<any>, parent?: Node<any>) {
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
                let n = this.node(cell);
                if (!(graph.get(cell.id) || cell.isEdge())) {
                    graph.add(n);
                    if (parent) {
                        graph.connect(parent, n, 'parent');
                    }
                }
                if (cell.children) {
                    for (let child of cell.children) {
                        this.write(child, values, existing, graph, n);
                    }
                }
            }
        }
    }

}


export class SerializationGraph extends Graph<any> {

}

interface GraphElement {
    id: string;
    value: Layer;
}
