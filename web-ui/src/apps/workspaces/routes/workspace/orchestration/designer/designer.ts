
import {
    autoinject,
    containerless,
    customElement,
    bindable
} from "aurelia-framework";

import {OrchestrationProviderFactory} from "apps/workspaces/lib/palette/orchestration/templates/provider-factory";
import {OrchestrationTemplate, OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template";
import {NavigationAware} from "apps/workspaces/resources/custom-elements/navigator";
import {RouteConfig} from "aurelia-router";


@autoinject
@NavigationAware
export default class OrchestrationDesigner {

    @bindable
    private elementFactory: OrchestrationProviderFactory;

    @bindable
    private orchestration: OrchestrationTemplate;

    constructor(
        elementFactory: OrchestrationProviderFactory,
        private orchestrationService: OrchestrationTemplateService
    ) {
        this.elementFactory = elementFactory;
    }

    activate(params:string, routeConfig:RouteConfig) {
        console.log(routeConfig);
        // routeConfig.navModel.setTitle(this.orchestration.name);
    }

    attached() {
        this.orchestration = this.orchestrationService.orchestrationTemplate;
    }


}