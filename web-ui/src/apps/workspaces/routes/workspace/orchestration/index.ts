import {autoinject, bindable} from "aurelia-framework";
import {
    OrchestrationTemplate,
    OrchestrationTemplateService
} from "apps/workspaces/lib/model/core/orchestration-template";

@autoinject
export class OrchestrationDashboard {

    @bindable
    orchestration: OrchestrationTemplate;

    constructor(private orchestrationService: OrchestrationTemplateService) {
        this.orchestration = this.orchestrationService.orchestrationTemplate;
    }

    attached() : void {
        console.log("Dashboard");
    }
}