import {
    Drawable,
    Edge,
    RenderableVertex as Vertex
} from 'lib/designer/model';


import {ElementLoader} from "lib/designer/canvas/palette";
import {Vertex as TaskVertex} from 'lib/designer/model/graph';
import {Canvas} from "lib/designer/canvas/canvas";
import {mxCell} from "mxgraph";

export function dockerInitialLayout(x: number, y: number): Vertex {
    let parent = new DockerOrchestrationTemplateProviderElement('', x - 160, y),
        manager = new DockerManagerNode('manager', 10, 15, 70, 70),
        worker = new DockerWorkerNode('worker', 300, 15, 70, 70);
    parent.addChild(worker);
    parent.addChild(manager);
    return parent;
};

export class DockerOrchestrationTemplateProviderElement extends Vertex {

    labelVisible = false;

    style: string = "docker-group-style";

    constructor(label: string, x: number, y: number) {
        super(label, x, y, 380, 100);
    }


    addTo(canvas: Canvas): boolean {
        let a = super.addTo(canvas);
        return a;
    }

    protected doInsert(canvas: Canvas): void {
        canvas.addCell(this, null);
        let edge = new mxCell(),
            manager = this.children[0],
            worker = this.children[1];


        let e = canvas.insertEdge(this, 'frap', 'fap', worker, manager, 'strokeColor=#0087c9;dashed=1;strokeWidth=2');
        e.setEdge(true);
    }

}


export class DockerNode extends Vertex {
    style: string = 'docker-node-style';
    displayIcon: string = 'assets/icons/hal/orchestration/providers/docker-single.svg';
}


export class DockerManagerNode extends DockerNode {

}


export class DockerWorkerNode extends DockerNode {

}


export class ManagerToWorkerConnection extends Edge {

    constructor(manager: DockerNode, worker: DockerNode) {
        super(manager, worker);
    }

}

export class DockerManagerElementLoader implements ElementLoader {

    static readonly types = {
        'DockerWorkerNode': DockerWorkerNode,
        'DockerManagerNode': DockerManagerNode,
        'DockerOrchestrationTemplateProviderElement': DockerOrchestrationTemplateProviderElement,
    };


    load(canvas: Canvas, v: TaskVertex): Drawable {
        let ctor = DockerManagerElementLoader.types[v.type];
        return new ctor('whatever', v.layout.x, v.layout.y, v.layout.width, v.layout.height);

        // let node = new DockerManagerNode(
        //     'manager',
        //     v.layout.x,
        //     v.layout.y,
        //     v.layout.width,
        //     v.layout.height
        // );
        // return node;
    }
}