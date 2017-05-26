import {
    autoinject,
    containerless,
    customElement,
    bindable
} from "aurelia-framework";
import {OrchestrationProviderFactory} from "apps/workspaces/lib/palette/orchestration/templates/provider-factory";
import {OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template";
import {RegistryProviderFactory} from "apps/workspaces/lib/palette/orchestration/registries/provider-factory";
import {DesignerManager} from "lib/designer/core/designer-manager";


@autoinject
// @NavigationAware
export class OrchestrationDesigner {

    @bindable
    private elementFactory: OrchestrationProviderFactory;

    @bindable private
    registryFactory: RegistryProviderFactory;

    constructor(
        elementFactory: OrchestrationProviderFactory,
        private orchestrationService: OrchestrationTemplateService,
        private designerManager: DesignerManager
    ) {
        this.elementFactory = elementFactory;
        this.registryFactory = new RegistryProviderFactory();
    }

    attached() : void {
        this.orchestrationService.currentGraph().then(t => {
            this.designerManager.getCurrent().setGraph(t);
        });
    }



}