import {
    Drawable,
    Edge,
    RenderableVertex as Vertex
} from 'lib/designer/model';


import {ElementLoader} from "lib/designer/canvas/palette";
import {CanvasModel} from "lib/designer/model/model";
import {Vertex as TaskVertex} from 'lib/designer/model/graph';
import {Canvas} from "lib/designer/canvas/canvas";

export class DockerNode extends Vertex {
    style: string = 'docker-node-style';
    displayIcon         : string = 'assets/icons/hal/orchestration/providers/docker-single.svg';
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


    load(canvas:Canvas , v: TaskVertex) : void {
        // let node = new DockerManagerNode(
        //     'manager',
        //     v.layout.x,
        //     v.layout.y,
        //     v.layout.width,
        //     v.layout.height
        // );
        // node.addTo(canvas);
    }
}