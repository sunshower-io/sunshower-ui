import {autoinject} from "aurelia-dependency-injection";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace/service";
import {OrchestrationTemplate} from "apps/workspaces/lib/model/core/orchestration-template/model";
import {DialogService} from "aurelia-dialog";
import {Workspace} from "apps/workspaces/lib/model/core/workspace/model";
import {CreateTemplateDialog} from "./create-template";

@autoinject
export class TemplateList {

    private workspace: Workspace;
    private templates: OrchestrationTemplate[];
    
    constructor(
        private dialogService: DialogService,
        private workspaceService:WorkspaceService
    ) {
        
    }
    
    attached() : void {
        this.load();
    }
    
    
    async load() {
        this.setLoading(true);
        this.workspace = await this.workspaceService.current();
        this.templates = await this.workspaceService.getTemplates(this.workspace.id);
        this.setLoading(false);
    }
    

    private setLoading(loading:boolean) : void {
        
        
    }
    
    private create() : void {
        this.dialogService.open({
            model       : this.workspace,
            viewModel   : CreateTemplateDialog,
        });
    }
    
}