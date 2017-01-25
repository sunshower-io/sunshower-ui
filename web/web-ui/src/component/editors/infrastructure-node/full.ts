import {bindable} from 'aurelia-framework';

import {
    ElementEditor, EditorMode
} from "canvas/element/element";

import {
    InfrastructureNode
} from "component/model/infrastructure-node";


export class FullInfrastructureNodeEditor implements ElementEditor<InfrastructureNode> {


    readonly editorMode : EditorMode = {
        viewState: 'full'
    };

    list:HTMLElement;

    @bindable
    private node:InfrastructureNode;


    open(node: InfrastructureNode): void {
        this.node = node;

    }


}
