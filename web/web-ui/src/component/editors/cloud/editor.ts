import {bindable} from "aurelia-framework";
import {VirtualCloud} from "component/model/cloud";
import {ElementEditor} from "canvas/element/element";

export class VirtualCloudEditor implements ElementEditor<VirtualCloud> {
    @bindable
    private cloud:VirtualCloud;

    open(e: VirtualCloud): void {
        this.cloud = e;
    }

}