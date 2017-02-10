import {RegistryAwareElement} from "canvas/element/registry-aware";
import {mxGeometry} from "mxgraph";
import {InfrastructureElement} from "./infrastructure";

export class GatewayElement extends InfrastructureElement {

    constructor() {
        super();
        this.name = "Gateway";
        this.geometry = new mxGeometry();
        this.icon = 'assets/sui/themes/hasli/assets/images/globe.svg';
    }

    copy() : GatewayElement {
        let clone = new GatewayElement(),
            geometry = this.geometry.clone();
        clone.geometry = geometry;
        return clone;
    }

}
