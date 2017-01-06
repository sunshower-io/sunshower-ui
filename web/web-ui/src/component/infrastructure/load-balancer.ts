import {EditableElement} from "canvas/element/element";
import {LoadBalancerComponentElementEditor}
    from "component/editors/load-balancer/editor";
import {Class} from "lang/class";
import {mxGeometry} from "mxgraph";
import {InfrastructureElement} from "./infrastructure";

export class LoadBalancerComponentElement extends InfrastructureElement
    implements EditableElement<
        LoadBalancerComponentElement,
        LoadBalancerComponentElementEditor> {

    editor: Class<LoadBalancerComponentElementEditor> =
        LoadBalancerComponentElementEditor;

    constructor() {
        super();
        this.geometry = new mxGeometry();
        this.name = "Load Balancer";
        this.icon = 'assets/sui/themes/hasli/assets/images/icons/provider/generic/load-balancer.svg';
        console.log("ICOn", this.icon);
    }

    copy() : LoadBalancerComponentElement {
        let clone = new LoadBalancerComponentElement(),
            geometry = this.geometry.clone();
        clone.geometry = geometry;
        return clone;
    }

}
