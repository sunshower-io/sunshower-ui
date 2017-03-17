import {bindable} from 'aurelia-framework';

import {InfrastructureNode} from "apps/workspaces/model/infrastructure";
import {
    ElementEditor,
    EditorMode
} from "common/lib/canvas/element";

interface InfrastructureNodeComponent {
    name             : string;
    path             : string;
    active          ?: boolean;
}

export class Model {
    editorMode              :EditorMode;
    node                    :InfrastructureNode;
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
        this.editorMode.data = node;
    }


}
