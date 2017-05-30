import {
    Drawable,
    Edge,
    RenderableVertex as Vertex
} from 'lib/designer/model';

import {ElementLoader} from "lib/designer/canvas/palette";
import {Vertex as TaskVertex} from 'lib/designer/model/graph';
import {Canvas} from "lib/designer/canvas/canvas";
import {mxCell} from "mxgraph";
import {KubernetesOrchestrationTemplateProviderElement} from "./kubernetes-orchestration-template";


export function kubernetesInitialLayout(x: number, y: number): Vertex {
    let parent = new KubernetesOrchestrationTemplateProviderElement('', x - 160, y),
        manager = new KubernetesMasterNode('Master', 10, 15, 70, 70),
        worker = new KubernetesNodeNode('Node', 300, 15, 70, 70);
    parent.addChild(worker);
    parent.addChild(manager);
    return parent;
}

export class KubernetesNode extends Vertex {
    style: string = 'kubernetes-node-style';
    displayIcon: string = 'assets/icons/hal/orchestration/providers/kubernetes-single.svg';
}

export class KubernetesMasterNode extends KubernetesNode {

}

export class KubernetesNodeNode extends KubernetesNode {

}

export class MasterToNodeConnection extends Edge {
    constructor(master: KubernetesMasterNode, node: KubernetesNodeNode) {
        super(master, node);
    }
}

export class KubernetesMasterElementLoader implements ElementLoader {
    static readonly types = {
        'KubernetesNodeNode': KubernetesNodeNode,
        'KubernetesMasterNode': KubernetesMasterNode,
        'KubernetesOrchestrationTemplateProviderElement': KubernetesOrchestrationTemplateProviderElement
    }

    load(canvas: Canvas, v: TaskVertex): Drawable {
        let ctor = KubernetesMasterElementLoader.types[v.type];
        return new ctor('whatever', v.layout.x, v.layout.y, v.layout.width, v.layout.height);
    }
}