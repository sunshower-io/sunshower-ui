import {
    Drawable,
    Edge,
    RenderableVertex as Vertex
} from 'lib/designer/model';

import {ElementLoader} from "lib/designer/canvas/palette";
import {Vertex as TaskVertex} from 'lib/designer/model/graph';
import {Canvas} from "lib/designer/canvas/canvas";
import {mxCell} from "mxgraph";

export function hasliInitialLayout(x: number, y: number): Vertex {
    let parent = new HasliOrchestrationTemplateProviderElement('', x - 160, y),
        manager = new HasliInitiatorNode('Initiator', 10, 15, 70, 70),
        worker = new HasliAgentNode('Agent', 300, 15, 70, 70);
    parent.addChild(worker);
    parent.addChild(manager);
    return parent;
}

export class HasliOrchestrationTemplateProviderElement extends Vertex {
    labelVisible = false;
    style: string = 'hasli-group-style';
    label: string = 'Hasli Orchestration';

    constructor(label: string, x: number, y: number, v?: TaskVertex) {
        super(label, x, y, 380, 100, v);
    }

    addTo(canvas: Canvas): boolean {
        let a = super.addTo(canvas);
        return a;
    }

    protected doInsert(canvas: Canvas): void {
        canvas.addCell(this, null);
        let edge = new mxCell(),
            initiator = this.children[0],
            agent = this.children[1];

        let e = canvas.insertEdge(this, '', '', agent, initiator, 'strokeColor=#0087c9;dashed=1;strokeWidth=2');
        e.setEdge(true);

        let e2 = canvas.insertEdge(this, '', '', initiator, agent, 'strokeColor=#0087c9;dashed=1;strokeWidth=2');
        e2.setEdge(true);
    }


}

export class HasliNode extends Vertex {
    style: string = 'hasli-node-style';
    displayIcon: string = 'assets/icons/hal/orchestration/providers/hasli-single.svg';
}

export class HasliInitiatorNode extends HasliNode {
    label: string = "Initiator";
}

export class HasliAgentNode extends HasliNode {
    label: string = "Agent";
}

export class InitiatorToAgentConnection extends Edge {
    constructor(initiator: HasliInitiatorNode, agent: HasliAgentNode) {
        super(initiator, agent);
    }
}

export class HasliInitiatorElementLoader implements ElementLoader {

    static readonly types = {
        'HasliAgentNode' : HasliAgentNode,
        'HasliInitiatorNode': HasliInitiatorNode,
        'HasliOrchestrationTemplateProviderElement': HasliOrchestrationTemplateProviderElement
    };

    load(canvas: Canvas, v: TaskVertex) : Drawable {
        let ctor = HasliInitiatorElementLoader.types[v.type];
        return new ctor(v.name, v.layout.x, v.layout.y, v.layout.width, v.layout.height, v);
    }

}