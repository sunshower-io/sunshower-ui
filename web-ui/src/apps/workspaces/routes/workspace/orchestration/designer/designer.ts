import {
    autoinject,
    containerless,
    customElement,
    bindable
} from "aurelia-framework";

import {Designer} from "lib/designer/core/designer";
import {OrchestrationProviderFactory} from "apps/workspaces/lib/palette/orchestration/templates/provider-factory";
import {OrchestrationTemplate, OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template";
import {DesignerManager} from "lib/designer/core/designer-manager";
import {NavigationAware} from "apps/workspaces/resources/custom-elements/navigator";
import {RouteConfig} from "aurelia-router";
import {ServiceManager} from "lib/common/service/service-manager";
import {RegistryProviderFactory} from "apps/workspaces/lib/palette/orchestration/registries/provider-factory";


@autoinject
@customElement('orchestration-designer')
export default class OrchestrationDesigner {


    @bindable
    private registryFactory: RegistryProviderFactory;

    @bindable
    private orchestration: OrchestrationTemplate;


    @bindable
    private elementFactory: OrchestrationProviderFactory;

    constructor(
        elementFactory: OrchestrationProviderFactory,
        private orchestrationService: OrchestrationTemplateService,
        private designerManager: DesignerManager
    ) {
        this.elementFactory = elementFactory;
        this.registryFactory = new RegistryProviderFactory();
    }

    activate(params:string, routeConfig:RouteConfig) {
        //why would this work without NavigationAware but not work with?
        this.orchestrationService.current().then(orch => {
            routeConfig.navModel.setTitle(orch.name);
        });

    }
    //
    // attached() {
    //     this.orchestration = this.orchestrationService.orchestrationTemplate;
    // }

    attached() : void {
        this.orchestrationService.currentGraph().then(t => {
            this.designerManager.getCurrent().setGraph(t);
        });
    }



}