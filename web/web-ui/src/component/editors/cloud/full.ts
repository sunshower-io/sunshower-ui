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
    protected activeComponent:CloudComponent;

    @bindable
    protected components:CloudComponent[];

    constructor() {
        this.components = [{
            name: 'Summary',
            path: 'basic',
            active: true
        }, {
            name: 'Credentials',
            path: 'credentials'
        }];
    }

    setActive(active:CloudComponent) {
        if(this.activeComponent) {
            this.activeComponent.active = false;
        }
        this.activeComponent = active;
        this.activeComponent.active = true;
    }

    open(e: VirtualCloud): void {
        this.cloud = e;
    }

}