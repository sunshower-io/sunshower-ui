import {
    Drawable,
    RenderableVertex as Vertex
} from 'lib/designer/model';


export class DockerNode extends Vertex {

    style: string = 'docker-node-style';

}


export class DockerManagerNode extends DockerNode {

}


export class DockerWorkerNode extends DockerNode {

}
