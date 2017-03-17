import {
    bindable,
    inject
} from "aurelia-framework";

import {HttpClient} from "aurelia-fetch-client";
import {CredentialSecret} from "../../../model/core/secret/credentials";
import {InfrastructureNode} from "component/model/infrastructure-node";
import {json} from "aurelia-fetch-client";

export class InfrastructureNodeCloud {

    @bindable
    private node                : InfrastructureNode;


    constructor() {

    }

    activate(node:InfrastructureNode) : void {
        this.node = node;
    }

}