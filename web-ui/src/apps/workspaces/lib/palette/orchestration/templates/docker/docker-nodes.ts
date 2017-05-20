import {
    Drawable,
    Edge,
    RenderableVertex as Vertex
} from 'lib/designer/model';
import {mxEdge} from "mxgraph";


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