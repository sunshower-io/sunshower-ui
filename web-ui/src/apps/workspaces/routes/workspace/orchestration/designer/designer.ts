
import {
    autoinject,
    containerless,
    customElement,
    bindable
} from "aurelia-framework";

import {OrchestrationProviderFactory} from "apps/workspaces/lib/palette/orchestration/templates/provider-factory";
import {OrchestrationTemplate, OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template";


@autoinject
@customElement('orchestration-designer')
export default class OrchestrationDesigner {

    @bindable
    private elementFactory: OrchestrationProviderFactory;

    @bindable
    private orchestration: OrchestrationTemplate;

    constructor(
        elementFactory: OrchestrationProviderFactory,
        orchestrationService: OrchestrationTemplateService
    ) {
        this.elementFactory = elementFactory;
        this.orchestration = orchestrationService.orchestrationTemplate;
    }



}