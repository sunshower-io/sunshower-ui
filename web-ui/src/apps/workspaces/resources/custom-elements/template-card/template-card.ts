import {bindable, customElement} from "aurelia-templating";
import {Router} from "aurelia-router";
import {autoinject} from "aurelia-dependency-injection";
import {OrchestrationTemplate} from "apps/workspaces/lib/model/core/orchestration-template/model";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace/service";
import {createEvent} from "lib/common/dom/events";

@autoinject
@customElement('template-card')
export class TemplateCard {

    
    @bindable
    private template:OrchestrationTemplate;
    
    constructor(
        private router: Router, 
        private element: Element,
    ) {
        
        
    }
    
   
    
    attached() : void {
    }
    
    link(id: string) : void {
        let event = createEvent('link', {
            id: id
        });
        this.element.dispatchEvent(event);
    }
    
    open() : void {
        this.router.navigateToRoute(
            'draftboard', {
                orchestrationTemplateId: this.template.id
            })
    }
    
}