import {bindable, customElement} from "aurelia-templating";
import {Router} from "aurelia-router";
import {autoinject} from "aurelia-dependency-injection";
import {OrchestrationTemplate} from "apps/workspaces/lib/model/core/orchestration-template/model";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace/service";

@autoinject
@customElement('template-card')
export class TemplateCard {

    @bindable
    private template:OrchestrationTemplate;
    
    constructor(
        private router: Router, 
        workspaceService:WorkspaceService
    ) {
        
        
    }
    
   
    
    attached() : void {
    }
    
    open() : void {
        this.router.navigateToRoute(
            'draftboard', {
                orchestrationTemplateId: this.template.id
            })
    }
    
}