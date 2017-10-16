import 'ace'
import {autoinject} from "aurelia-dependency-injection";
import {OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template/service";
import {Vertex} from "lib/designer/model/graph/vertex";
import Editor = AceAjax.Editor;
import {DialogController} from "aurelia-dialog";
import {
    ContentDefinition,
    EditorModel, HandlerMappings
} from "./editor-model";

@autoinject
export class SyntaxAwareTextEditor {

    private vertex      : Vertex;

    private editor      : HTMLElement;
    private initialized : Editor;
    loading             : boolean = true;
    private value       : string;
    contentDefinitions  : ContentDefinition[];
    
    contentDropdown     : HTMLElement;
    
    handlerMappings     : HandlerMappings;
    
    constructor(private dialogController: DialogController,
                private templateService: OrchestrationTemplateService) {
        (ace as any).config.set('basePath', 'jspm_packages/github/ajaxorg/ace-builds@1.2.6');
        this.handlerMappings = new HandlerMappings();
    }
    
    showContentTypes() : void {
        
        
    }

    
    setContentType(definition: ContentDefinition) {
        let mode = this.handlerMappings.lookup(definition.handler);
        this.initialized
            .getSession()
            .setMode({
                path: mode,
                v : Date.now(),
            });
    }

    bind() {
        let editor = ace.edit(this.editor);
        // editor.getSession().setMode("ace/mode/json");
        editor.resize(true);
        editor.renderer.updateFull(true);
        this.initialized = editor;
        
       
        setTimeout(() => {
            $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrainWidth: false, // Does not change width of dropdown to that of the activator
                hover: true, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: false, // Displays dropdown below the button
                alignment: 'left', // Displays dropdown with edge aligned to the left of button
                stopPropagation: false // Stops event propagation
            });
        }, 200);
    }

    activate(model: EditorModel): void {
        let vertex = model.vertex;
        this.contentDefinitions = model.handlers;
        this.vertex = vertex;
        this.handlerMappings.configure(model.mappings);
        this.templateService.getContent(vertex.id)
            .then(t => {
                this.initialized.setValue(t);
                this.loading = false;
                this.initialized.resize(true);
                this.initialized.renderer.updateFull(true);
            });
    }

    save(): void {
        this.templateService.saveContent(
            this.vertex.id,
            this.initialized.getValue()
        ).then(t => this.dialogController.ok())
    }
}