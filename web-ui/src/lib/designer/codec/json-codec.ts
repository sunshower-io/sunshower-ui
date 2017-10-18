import * as _ from 'lodash';

import {
    Graph,
    Node,
    Vertex
} from "lib/common/algorithms/graph/graph";


import {
    Layer, mxCell, mxEdge,
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
import {Edge} from "lib/designer/model/graph/edge";
import {ElementFactoryProvider, ElementLoader} from "lib/designer/canvas/palette";
import {Codec} from "./codec";


export interface Encoder<T> {
    encode(t: Vertex<T>): {};
}

export class DefaultEncoder implements Encoder<any> {
    encode(t: Vertex<any>): {} {

        let n = t.data as Layer,
            geo = n.geometry;

        return {
            id: t.id,
            name: (n as any).value,
            type: getClass(t.data).name,
            layout: {
                x: geo.x,
                y: geo.y,
                width: geo.width,
                height: geo.height
            }, 
            content: {
                type: 'reference',
                reference: 'definition'
            }
        }
    }

}

export class JsonCodec implements Codec {

    factories                   : Map<string, ElementFactoryProvider>;
    loaders                     : Map<string, ElementLoader>;
    encoders                    : Map<Class<any>, Encoder<any>>;

    private defaultEncoder      : Encoder<any>;

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

    registerProviderFactory(
        key: string,
        factory:ElementFactoryProvider
    ) : void {
        if(!this.factories) {
            this.factories = new Map<string, ElementFactoryProvider>();
        }
        this.factories.set(key, factory);
    }

    registerLoader(key: string, loader:ElementLoader) : void {
        if(!this.loaders) {
            this.loaders = new Map<string, ElementLoader>();
        }
        this.loaders.set(key, loader);
    }


    resolveElementLoader(key:string, canvas: Canvas) : ElementLoader {
        if(this.loaders && this.loaders.has(key)) {
            return this.loaders.get(key);
        }
        return canvas.resolveElementLoader(key);
    }


    resolveRoots(g: TaskGraph, canvas: Canvas): Layer[] {
        let nodes = _.reduce(g.vertices, (m, v) => {
                if (!m[v.id]) {
                    let e = this.resolveElementLoader(
                        v.type,
                        canvas
                    ).load(canvas, v);
                    (e as any).id = v.id;
                    m[v.id] = {id: v.id, value: e}
                }
                return m;
            }, {}),
            parentEdges = (g.edges || []).filter(t => t.relationship === 'parent'),
            sets = _.reduce(_.values(parentEdges), (r, edge) => {
                let e = edge as Edge,
                    pnode = nodes[e.source],
                    cnode = nodes[e.target],
                    parent = pnode ? pnode.value : null,
                    child = cnode ? cnode.value : null;
                
               
                if(parent) {
                    parent.addChild(child);
                }
                if(child) {
                    r.children[child.id] = true;
                }
                return r;
            }, {children:{}}),
            rootKeys = _.difference(
                _.keys(nodes),
                _.keys(sets.children)
            );
        return _.map(rootKeys, (k) => nodes[k].value);
    }


    import(canvas: Canvas, graph: TaskGraph): void {
        canvas.getModel().beginUpdate();
        let defaultParent = canvas.getDefaultParent();
        try {
            let roots = this.resolveRoots(graph, canvas);
            let rootIds = new Map<string, mxCell>();
            for(let root of roots) {
                let r = root as any;
                rootIds.set(root.id, root);
                if(r.addTo) {
                    r.addTo(canvas);
                } else {
                    canvas.addCell(r, defaultParent);
                }
            }
            
            let edges = graph.edges;
            if(edges) {
                for (let edge of edges) {
                    let source = rootIds.get(edge.source),
                        target = rootIds.get(edge.target);
                    let e = canvas.insertEdge(canvas.getDefaultParent(), '', '', source, target, 'strokeColor=#4b738d;dashed=0;strokeWidth=1');
                }
            }
        } finally {
            canvas.getModel().endUpdate();
        }

    }

    export(model: mxGraphModel, canvas: mxGraph): {} {
        let g = this.buildGraph(model, canvas),
            v = new TopologicalSort().run(g),
            vs = [],
            es = [],
            r = {vertices: vs, edges: es};

        if(v) {
            for (let t of v) {
                let encoder = this.encoders.get(getClass(t.data)) || this.defaultEncoder;
                vs.push(encoder.encode(t));
                this.addEdges(es, t);
            }
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
        graph.nodes = graph.nodes || {};
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
