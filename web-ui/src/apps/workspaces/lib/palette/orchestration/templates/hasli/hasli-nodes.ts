import {
    Drawable,
    Edge,
    RenderableVertex as Vertex
} from 'lib/designer/model';

import {ElementLoader} from "lib/designer/canvas/palette";
import {Vertex as TaskVertex} from 'lib/designer/model/graph';
import {Canvas} from "lib/designer/canvas/canvas";
import {mxCell} from "mxgraph";
import {HasliOrchestrationTemplateProviderElement} from "./hasli-orchestration-template";

export function hasliInitialLayout(x: number, y: number): Vertex {
    let parent = new HasliOrchestrationTemplateProviderElement('', x - 160, y),
        manager = new HasliInitiatorNode('Initiator', 10, 15, 70, 70),
        worker = new HasliAgentNode('Agent', 300, 15, 70, 70);
    parent.addChild(worker);
    parent.addChild(manager);
    return parent;
}


export class HasliNode extends Vertex {
    style: string = 'hasli-node-style';
    displayIcon: string = 'assets/icons/hal/orchestration/providers/hasli-single.svg';
}

export class HasliInitiatorNode extends HasliNode {

}

export class HasliAgentNode extends HasliNode {

}

export class InitiatorToAgentConnection extends Edge {
    constructor(initiator: HasliInitiatorNode, agent: HasliAgentNode) {
        super(initiator, agent);
    }
}

export class HasliInitiatorElementLoader implements ElementLoader {

    static readonly types = {
        'HasliAgentNode' : HasliAgentNode,
        'HasliIniatiatorNode': HasliInitiatorNode,
        'HasliOrchestrationTemplateProviderElement': HasliOrchestrationTemplateProviderElement
    }

    load(canvas: Canvas, v: TaskVertex) : Drawable {
        let ctor = HasliInitiatorElementLoader.types[v.type];
        return new ctor('whatever', v.layout.x, v.layout.y, v.layout.width, v.layout.height);
    }

}