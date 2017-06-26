import {Canvas} from "lib/designer/canvas/canvas";
import {ElementLoader} from "lib/designer/canvas/palette";
import {Vertex} from "lib/designer/model/graph/vertex";
import {Drawable} from "lib/designer/model/elements";
import {autoinject} from "aurelia-dependency-injection";
import {DockerRegistryService} from "lib/hal/docker/service";
import {RegistryElement} from "./provider-factory";


@autoinject
export class RegistryElementLoader implements ElementLoader {

    constructor(
        private service: DockerRegistryService
    ) {

    }

    load(model: Canvas, v: Vertex): Drawable {
        return new RegistryElement('hello', 'world', v.layout.x, v.layout.y);
    }

}

