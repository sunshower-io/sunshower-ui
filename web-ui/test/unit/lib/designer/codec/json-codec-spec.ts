import {} from 'jasmine';


import {Canvas} from "lib/designer/canvas/canvas";
import {JsonCodec} from 'lib/designer/codec/json-codec';
import {TaskGraph, Vertex, Edge} from 'lib/designer/model/graph';
import {ElementLoader} from "lib/designer/canvas/palette";
import {DockerManagerNode} from "apps/workspaces/lib/palette/orchestration/templates/docker/docker-nodes";


describe('a task-graph codec should', () => {

    let codec: JsonCodec;


    beforeEach(() => {
        codec = new JsonCodec();
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
            edge = new Edge()
        tg.addVertex(parent);
        tg.addVertex(child);
        edge.target = parent;
        edge.source = child;
        edge.id = 'frap';
        let roots = codec.resolveRoots(tg, canvas);
        expect(roots.length).toBe(1);
    });


});

class MockElementLoader implements ElementLoader {

    load(model:Canvas, v: Vertex) : void {
        let dmn = new DockerManagerNode();
        dmn.addTo(model);
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
        console.error("OMG", a);
    }

}