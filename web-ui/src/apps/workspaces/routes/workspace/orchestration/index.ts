import {autoinject, bindable} from "aurelia-framework";
import {OrchestrationTemplate, OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template";
import {NavigationAware} from "apps/workspaces/resources/custom-elements/navigator";

@autoinject
@NavigationAware
export class OrchestrationDashboard {

    @bindable
    orchestration: OrchestrationTemplate;

    constructor(private orchestrationService: OrchestrationTemplateService) {
        this.orchestration = this.orchestrationService.orchestrationTemplate;
    }
}