import {} from 'jasmine';


import {Canvas} from "lib/designer/canvas/canvas";
import {JsonCodec} from 'lib/designer/codec/json-codec';
import {TaskGraph, Vertex, Edge} from 'lib/designer/model/graph';
import {ElementLoader} from "lib/designer/canvas/palette";
import {DockerManagerNode} from "apps/workspaces/lib/palette/orchestration/templates/docker/docker-nodes";

class MockElementLoader implements ElementLoader {

    load(model:Canvas, v: Vertex) : void {
        let dmn = new DockerManagerNode();
        dmn.addTo(model);
        return dmn;
    }

}

export class MockModel {
    beginUpdate() : void {

    }
    endUpdate() : void {

    }
}


class MockCanvas {

    resolveElementLoader(key:string) : ElementLoader {
        return new MockElementLoader();
    }

    getModel() : MockModel {
        return new MockModel();
    }

    addCell(a, b, c, d) : void {
    }

}

describe('a task-graph codec should', () => {

    let connect = (tg: TaskGraph, r1: Vertex, r2: Vertex) => {
        let edge = new Edge();
        edge.source = r1.id;
        edge.target = r2.id;
        edge.relationship = 'parent';
        tg.addEdge(edge);
    };

    let node = (tg: TaskGraph, id:string) => {
        let v1 = new Vertex();
        v1.id = id;
        tg.addVertex(v1);
        return v1;
    };


    let codec: JsonCodec,
        tg = new TaskGraph(),
        r1 = node(tg, 'root1'),
        r1c1 = node(tg, 'root1-child1'),
        r1c2 = node(tg, 'root1-child2'),
        r1c3 = node(tg, 'root1-child3'),
        r1gc1 = node(tg, 'root1-gchild1'),
        r1ggc1 = node(tg, 'root1-ggchild1'),
        r1gc2 = node(tg, 'root1-gchild2'),
        canvas = new MockCanvas();

    connect(tg, r1, r1c1);
    connect(tg, r1, r1c2);
    connect(tg, r1, r1c3);
    connect(tg, r1c1, r1gc1);
    connect(tg, r1gc1, r1ggc1);
    connect(tg, r1c2, r1gc2);


    beforeEach(() => {
        codec = new JsonCodec();
    });

    it('should produce children with the correct structure', () => {

    });

    it('should produce a root with the expected children', () => {
        let roots = codec.resolveRoots(tg, canvas),
            root = roots[0];
        expect(root.children.length).toBe(3);
        expect(root.children.map(t => t.id)).toEqual([r1c1, r1c2, r1c3].map(t => t.id));
    });

    it('should produce nodes with the expected grand children ids', () => {
        let roots = codec.resolveRoots(tg, canvas),
            root = roots[0],
            c1 = root.children[0];
        expect(c1.children.map(t => t.id)).toEqual(['root1-gchild1']);
    });

    it('should produce nodes with the expected number of grand children', () => {
        let roots = codec.resolveRoots(tg, canvas),
            root = roots[0],
            c1 = root.children[0];
        expect(c1.children.length).toBe(1);
    });

    it('should build a single node when provided', () => {

        let tg = new TaskGraph(),
            parent = new Vertex(),
            canvas = new MockCanvas();
        tg.addVertex(parent);
        let roots = codec.resolveRoots(tg, canvas);
        expect(roots.length).toBe(1);
    });

    it('should build a single tree when provided a parent and a child', () => {

        let tg = new TaskGraph(),
            parent = new Vertex(),
            child = new Vertex(),
            canvas = new MockCanvas(),
            edge = new Edge();
        tg.addVertex(parent);
        tg.addVertex(child);
        edge.source = parent.id;
        edge.target = child.id;
        edge.relationship = 'parent';
        edge.id = 'frap';
        tg.addEdge(edge);
        let roots = codec.resolveRoots(tg, canvas),
            root = roots[0];
        expect(roots.length).toBe(1);
        expect(root.children.length).toBe(1);
    });

    it('should build a forest for a deeply-nested forest', () => {
        let roots = codec.resolveRoots(tg, canvas),
            root = roots[0];
        expect(roots.length).toBe(1);

    });
    it('should produce a root with correct id', () => {
        let roots = codec.resolveRoots(tg, canvas),
            root = roots[0];
        expect(root.id).toBe('root1');
    });



});

