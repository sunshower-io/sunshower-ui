import {bindable} from 'aurelia-framework';

import {
    ElementEditor, EditorMode
} from "canvas/element/element";

import {
    InfrastructureNode
} from "component/model/infrastructure-node";

interface InfrastructureNodeComponent {
    name             : string;
    path             : string;
    active          ?: boolean;
}

export class FullInfrastructureNodeEditor implements ElementEditor<InfrastructureNode> {


    readonly editorMode : EditorMode = {
        viewState: 'full'
    };

    list:HTMLElement;

    @bindable
    private node:InfrastructureNode;

    @bindable
    protected activeComponentPath:string;

    @bindable
    protected activeComponent:InfrastructureNodeComponent;

    @bindable
    public components:InfrastructureNodeComponent[];

    constructor() {
        this.components = [{
            name: 'Summary',
            path: 'basic',
            active: true
        }, {
            name: 'Credentials',
            path: 'credentials'
        }, {
            name: 'Cloud',
            path: 'cloud'
        }];
        this.activeComponent = this.components[0];
    }

    setActive(active:InfrastructureNodeComponent) {
        if(this.activeComponent) {
            this.activeComponent.active = false;
        }
        this.activeComponent = active;
        this.activeComponent.active = true;
        this.activeComponentPath = active.path;
    }

    open(node: InfrastructureNode): void {
        this.node = node;

    }


}
