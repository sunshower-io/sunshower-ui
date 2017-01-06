import {RegistryAwareElement} from "canvas/element/registry-aware";
import {mxGeometry} from "mxgraph";
import {InfrastructureElement} from "./infrastructure";

export class EndpointElement extends InfrastructureElement {

    constructor() {
        super();
        this.geometry = new mxGeometry();
        this.name = "Endpoint";
        this.icon = 'assets/sui/themes/hasli/assets/images/server.svg';
    }

    copy() : EndpointElement {
        let clone = new EndpointElement(),
            geometry = this.geometry.clone();
        clone.geometry = geometry;
        return clone;
    }

}
