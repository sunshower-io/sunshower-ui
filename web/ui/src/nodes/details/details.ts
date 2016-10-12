
import {Router} from "aurelia-router";
import {bindable, inject} from "aurelia-framework";
import {Node} from "../../service/nodes/NodeService";
import {RouteConfig} from "aurelia-router";
@inject(Router)
export class Details {

    @bindable node:Node;
    
    constructor() {
        
    }
    
    activate(params:Object, routeConfig:RouteConfig) {
        this.node = routeConfig.settings.node;
    }

    
}