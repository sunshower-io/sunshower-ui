import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace/service";
import {OrchestrationTemplate} from "apps/workspaces/lib/model/core/orchestration-template/model";
import {autoinject, bindable} from "aurelia-framework";
import {DesignerManager} from "lib/designer/core/designer-manager";
import {Router} from "aurelia-router";
import {OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template";

@autoinject
export class OrchestrationDeployment {

    @bindable
    private orchestration: OrchestrationTemplate;

    constructor(private workspaceService: WorkspaceService,
                private orchestrationService: OrchestrationTemplateService,
                private designerManager: DesignerManager,
                private router: Router) {

    }

    attached() {
        this.designerManager.toggleLoading();
        this.workspaceService.current().then(w => {
            this.orchestration = this.workspaceService.template;
            this.orchestrationService.bind(this.orchestration.id).then(t => {
                this.designerManager.toggleLoading();
            });
        });
    }
}