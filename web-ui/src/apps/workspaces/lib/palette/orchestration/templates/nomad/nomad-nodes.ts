import {
    Drawable,
    Edge,
    RenderableVertex as Vertex
} from 'lib/designer/model';

import {ElementLoader} from "lib/designer/canvas/palette";
import {Vertex as TaskVertex} from 'lib/designer/model/graph';
import {Canvas} from "lib/designer/canvas/canvas";
import {NomadOrchestrationTemplateProviderElement} from "./nomad-orchestration-template";

export function nomadInitialLayout(x: number, y: number): Vertex {
    let parent = new NomadOrchestrationTemplateProviderElement('', x - 160, y),
        manager = new NomadServerNode('Server', 10, 15, 70, 70),
        worker = new NomadClientNode('Client', 300, 15, 70, 70);
    parent.addChild(worker);
    parent.addChild(manager);
    return parent;
}


export class NomadNode extends Vertex {
    style: string = 'nomad-node-style';
    displayIcon: string = 'assets/icons/hal/orchestration/providers/nomad-single.svg';
}

export class NomadServerNode extends NomadNode {

}

export class NomadClientNode extends NomadNode {

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
        return new ctor('whatever', v.layout.x, v.layout.y, v.layout.width, v.layout.height);
    }

}