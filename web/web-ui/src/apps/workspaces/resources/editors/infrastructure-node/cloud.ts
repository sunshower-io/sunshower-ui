import {
    bindable
} from "aurelia-framework";
import {InfrastructureNode} from "apps/workspaces/model/components/infrastructure-node";


export class InfrastructureNodeCloud {

    @bindable
    private node                : InfrastructureNode;


    constructor() {

    }

    activate(node:InfrastructureNode) : void {
        this.node = node;
    }

}