import {
    Drawable,
    RenderableVertex as Vertex
} from 'lib/designer/model';


export class DockerNode extends Vertex {
    style: string = 'docker-node-style';
    displayIcon         : string = 'assets/icons/hal/orchestration/providers/docker-single.svg';
}


export class DockerManagerNode extends DockerNode {

}


export class DockerWorkerNode extends DockerNode {

}
