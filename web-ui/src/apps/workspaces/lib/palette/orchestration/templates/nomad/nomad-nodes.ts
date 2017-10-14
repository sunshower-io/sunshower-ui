import {
    Drawable,
    Edge,
    RenderableVertex as Vertex
} from 'lib/designer/model';

import {ElementLoader} from "lib/designer/canvas/palette";
import {Vertex as TaskVertex} from 'lib/designer/model/graph';
import {Canvas} from "lib/designer/canvas/canvas";
import {mxCell} from "mxgraph";

export function nomadInitialLayout(x: number, y: number): Vertex {
    let parent = new NomadOrchestrationTemplateProviderElement('', x - 160, y),
        manager = new NomadServerNode('Server', 10, 15, 70, 70),
        worker = new NomadClientNode('Client', 300, 15, 70, 70);
    parent.addChild(worker);
    parent.addChild(manager);
    return parent;
}

export class NomadOrchestrationTemplateProviderElement extends Vertex {
    labelVisible = false;
    label: string = 'Nomad Orchestration';
    style: string = 'nomad-group-style';

    constructor(label: string, x: number, y: number, v ?: TaskVertex) {
        super(label, x, y, 380, 100, v);
    }

    addTo(canvas: Canvas): boolean {
        let a = super.addTo(canvas);
        return a;
    }

    protected doInsert(canvas: Canvas): void {
        canvas.addCell(this, null);
        let edge = new mxCell(),
            server = this.children[0],
            client = this.children[1];

        let e = canvas.insertEdge(this, '', '', client, server, 'strokeColor=#4b738d;dashed=1;strokeWidth=2');
        e.setEdge(true);

    }

}

export class NomadNode extends Vertex {
    style: string = 'nomad-node-style';
    displayIcon: string = 'assets/icons/hal/orchestration/providers/nomad-single.svg';
}

export class NomadServerNode extends NomadNode {
    label: string = 'Server';
}

export class NomadClientNode extends NomadNode {
    label: string = 'Client';
}

export class ServerToClientConnection extends Edge {
    constructor(server: NomadServerNode, client: NomadClientNode) {
        super(server, client);
    }
}

export class NomadServerElementLoader implements ElementLoader {

    static readonly types = {
        'NomadClientNode': NomadClientNode,
        'NomadServerNode': NomadServerNode,
        'NomadOrchestrationTemplateProviderElement': NomadOrchestrationTemplateProviderElement
    };

    load(canvas: Canvas, v: TaskVertex): Drawable {
        let ctor = NomadServerElementLoader.types[v.type];
        return new ctor(v.name, v.layout.x, v.layout.y, v.layout.width, v.layout.height, v);
    }

}