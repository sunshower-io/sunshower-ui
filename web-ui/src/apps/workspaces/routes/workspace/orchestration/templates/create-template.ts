import {DialogController} from "aurelia-dialog";
import {autoinject} from "aurelia-dependency-injection";
import {Workspace} from "apps/workspaces/lib/model/core/workspace/model";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace/service";
import {OrchestrationTemplate, Version} from "apps/workspaces/lib/model/core/orchestration-template/model";
import {UUID} from "lib/common/lang/uuid";
import {OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template/service";
import {Identifier} from "lib/common/lang/identifier";
import {Router} from "aurelia-router";

@autoinject
export class CreateTemplateDialog {

    private nameId: string = UUID.random();
    private descriptionId: string = UUID.random();

    private workspace: Workspace;
    private template: OrchestrationTemplate;
    private link: boolean;
    private templateId: string;
    private router:Router;

    constructor(private dialogController: DialogController,
                private workspaceService: WorkspaceService,
                private templateService: OrchestrationTemplateService) {

    }

    activate(model: any): void {
        this.router = model.router;
        this.link = model.link;
        this.templateId = model.templateId;
        this.workspace = model.workspace;
        let template = new OrchestrationTemplate(),
            version = new Version();
        template.version = version;
        template.key = UUID.random();
        this.template = template;
    }

    async save(): Promise<void> {
        let id : Identifier = null;
        if (this.link) {
            let t = await this.templateService.link(this.templateId, this.template);
            id = new Identifier(t.id);
        } else {
            id = await this.workspaceService.addTemplate(this.workspace.id, this.template)
        }
        this.dialogController.ok(id);
        this.router.navigate(`${id.id}`)
    }

}