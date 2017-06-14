import {
    Drawable,
    Edge,
    RenderableVertex as Vertex
} from 'lib/designer/model';

import {ElementLoader} from "lib/designer/canvas/palette";
import {Vertex as TaskVertex} from 'lib/designer/model/graph';
import {Canvas} from "lib/designer/canvas/canvas";
import {mxCell} from "mxgraph";

export class KubernetesOrchestrationTemplateProviderElement extends Vertex {
    labelVisible = false;
    label: string = "Kubernetes Orchestration";
    style: string = 'kubernetes-group-style';

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
            master = this.children[0],
            node = this.children[1];

        let e = canvas.insertEdge(this, '', '', node, master, 'strokeColor=#0087c9;dashed=1;strokeWidth=2');
        e.setEdge(true);
    }

}

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
    label: string = "Master";
}

export class KubernetesNodeNode extends KubernetesNode {
    label: string = "Node";
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
    };

    load(canvas: Canvas, v: TaskVertex): Drawable {
        let ctor = KubernetesMasterElementLoader.types[v.type];
        return new ctor('whatever', v.layout.x, v.layout.y, v.layout.width, v.layout.height, v);
    }
}