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
import {HttpClient} from "aurelia-fetch-client";
import {ServiceManager} from "lib/common/service/service-manager";


@autoinject
// @NavigationAware
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
        //why would this work without NavigationAware but not work with?
        this.orchestrationService.current().then(orch => {
            routeConfig.navModel.setTitle(orch.name);
        });

    }

    attached() {
        this.orchestration = this.orchestrationService.orchestrationTemplate;
    }


}