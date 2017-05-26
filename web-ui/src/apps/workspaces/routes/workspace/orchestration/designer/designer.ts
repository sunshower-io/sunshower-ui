
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


@autoinject
@customElement('orchestration-designer')
export default class OrchestrationDesigner {


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
        this.orchestration = orchestrationService.orchestrationTemplate;
    }

    attached() : void {
        this.orchestrationService.currentGraph().then(t => {
            this.designerManager.getCurrent().setGraph(t);
        });
    }



}