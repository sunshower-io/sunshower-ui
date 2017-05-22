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
export class OrchestrationDesigner {

    @bindable
    private elementFactory: OrchestrationProviderFactory;

    @bindable
    private orchestration: OrchestrationTemplate;

    private routeConfig: RouteConfig;

    constructor(private orchestrationService: OrchestrationTemplateService,
        elementFactory: OrchestrationProviderFactory
    ) {
        this.elementFactory = elementFactory;
    }

    activate(params:string, routeConfig:RouteConfig) {
        //prototype required because of NavigationAware
        (this as any).prototype.routeConfig = routeConfig;
    }

    attached() {
        this.orchestration = this.orchestrationService.orchestrationTemplate;
        this.routeConfig.navModel.setTitle(this.orchestration.name);
    }


}