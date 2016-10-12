import {
    bindingMode, 
    bindable, 
    customElement
} from "aurelia-framework";

import {autoinject} from "aurelia-dependency-injection";

import {
    RevisableDocument, 
    ConfigurationService
} from "../../service/nodes/ConfigurationService";

@autoinject()
@customElement('commit-dialog')
export class CommitDialog {


 
    private dialog:Element;
    
    @bindable()
    private nodes:Array<Node>;
    
    private commitMessage:Element;

    @bindable()
    private revisedFiles:Array<RevisableDocument>;
    
    
    
    constructor(private configurationService:ConfigurationService) { 
        
        
    }

    
    bind() {
    }
    
    commitRevisions() : void {
        this.hideDialog();
        this.configurationService.commit($(this.commitMessage).val(), this.nodes);
        $(this.commitMessage).val("");
    }

    public showDialog(nodes?:Array<Node>):void {
        console.log(nodes);
        this.nodes = nodes;
        this.revisedFiles = 
            this.configurationService.getUncommittedDocuments();
        $(this.dialog).modal('show');
    }

    public hideDialog() : void {
        $(this.dialog).modal('hide');
    }

}