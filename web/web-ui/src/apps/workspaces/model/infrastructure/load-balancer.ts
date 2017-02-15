import {Class} from "common/lib/lang";
import {mxGeometry} from "mxgraph";
import {InfrastructureElement} from "./infrastructure";
import {EditableElement} from "common/lib/canvas/element";
import {LoadBalancerComponentElementEditor} from "apps/workspaces/resources/editors/load-balancer/editor";

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
    }

    copy() : LoadBalancerComponentElement {
        let clone = new LoadBalancerComponentElement(),
            geometry = this.geometry.clone();
        clone.geometry = geometry;
        return clone;
    }

    hasEditorOfRole(role: string): boolean {
        return true;
    }

    getEditorOfRole(role: string): Class<LoadBalancerComponentElementEditor> {
        return LoadBalancerComponentElementEditor;
    }
}
