import {DialogController} from "aurelia-dialog";
import {autoinject} from "aurelia-dependency-injection";
import {Workspace} from "apps/workspaces/lib/model/core/workspace/model";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace/service";
import {OrchestrationTemplate, Version} from "apps/workspaces/lib/model/core/orchestration-template/model";
import {UUID} from "lib/common/lang/uuid";

@autoinject
export class CreateTemplateDialog {
    
    private nameId                      : string = UUID.random();
    private descriptionId               : string = UUID.random();
   
    private workspace                   : Workspace;
    private template                    : OrchestrationTemplate;
    
    constructor(
        private dialogController: DialogController,
        private workspaceService: WorkspaceService
    ) {
        
    }
    
    activate(model:Workspace) : void {
        this.workspace = model;
        let template = new OrchestrationTemplate(),
            version = new Version();
        template.version = version;
        template.key = UUID.random();
        this.template = template;
    }
    
    save() : void {
        this.workspaceService.addTemplate(this.workspace.id, this.template)
            .then(t => this.dialogController.ok());
    }
    
}