import {bindable} from "aurelia-framework";
import {VirtualCloud} from "component/model/cloud";
import {ElementEditor} from "canvas/element/element";

interface CloudComponent {
    name             : string;
    path             : string;
    active          ?: boolean;
}

export class FullVirtualCloudEditor implements ElementEditor<VirtualCloud> {
    @bindable
    private cloud:VirtualCloud;

    @bindable
    protected activeComponentPath:string;

    @bindable
    protected activeComponent:CloudComponent;

    @bindable
    public components:CloudComponent[];

    constructor() {
        this.components = [{
            name: 'Summary',
            path: 'basic',
            active: true
        }, {
            name: 'Credentials',
            path: 'credentials'
        }];
        this.activeComponent = this.components[0];
    }

    setActive(active:CloudComponent) {
        if(this.activeComponent) {
            this.activeComponent.active = false;
        }
        this.activeComponent = active;
        this.activeComponent.active = true;
        this.activeComponentPath = active.path;
    }

    open(e: VirtualCloud): void {
        this.cloud = e;
    }

}