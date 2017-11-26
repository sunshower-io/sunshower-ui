import 'ace'
import {autoinject} from "aurelia-dependency-injection";
import {OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template/service";
import {Content, Vertex} from "lib/designer/model/graph/vertex";
import Editor = AceAjax.Editor;
import {DialogController} from "aurelia-dialog";
import {
    ContentDefinition,
    EditorModel, HandlerMappings
} from "./editor-model";
import {JsonCodec} from "lib/designer/codec/json-codec";
import {UUID} from "lib/common/lang/uuid";
import {bindable} from "aurelia-templating";
import {Property} from "lib/designer/model/entity";

@autoinject
export class SyntaxAwareTextEditor {
    contentArea                     : HTMLElement;
    fileType                        : string;
    scriptName                      : string;

    addPanel                        : HTMLElement;
    scriptType                      : HTMLElement;
    scriptId                        : string = UUID.random();
    nameId                          : string = UUID.random();
    private element                 : HTMLElement;
    private vertex                  : Vertex;

    private editor                  : HTMLElement;
    private initialized             : Editor;
    loading                         : boolean = true;
    private value                   : string;
    contentDefinitions              : ContentDefinition[];

    @bindable
    private addPanelShowing         : boolean;
    private editorVisible           : boolean;
    private propertiesVisible       : boolean;

    contentDropdown                 : HTMLElement;
    handlerMappings                 : HandlerMappings;
    private contents                : Content[];

    private currentId               : string;
    private currentEditor           : any;
    private currentContent          : Content;
    private contentEditorId         : string = UUID.random();
    private propertyViewerId        : string = UUID.random();
   
    private modeIsEditing           : boolean = true;
    
    static typeMappings = {
        'application/bash' : 'ace/mode/sh',
        'application/ruby' : 'ace/mode/ruby',
        'application/groovy' : 'ace/mode/groovy',
        'application/swell' : 'ace/mode/groovy'
    };
    private properties              : Property[];

    constructor(private dialogController: DialogController,
                private templateService: OrchestrationTemplateService) {
        (ace as any).config.set('basePath', 'jspm_packages/github/ajaxorg/ace-builds@1.2.6');
        this.handlerMappings = new HandlerMappings();
    }
    
    async showEditor() {
        this.modeIsEditing = true;
        await this.loadContent(this.vertex.id, this.currentContent);
    }
    
    async showProperties() {
        this.modeIsEditing = false;
        await this.loadContent(this.vertex.id, this.currentContent, true);
    }

    showContentTypes(): void {


    }


    setContentType(definition: ContentDefinition) {
        let mode = this.handlerMappings.lookup(definition.handler);
        this.initialized
            .getSession()
            .setMode({
                path: mode,
                v: Date.now(),
            });
    }

    bind() {


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

    async activate(model: EditorModel) {
        this.loading = true;
        this.vertex = model.vertex;
        let canvas = model.canvas,
            g = new JsonCodec().export(canvas.getModel(), canvas),
            contents = await this.templateService.getContents(model.vertex.id);
        this.configureTabs(contents);
        this.loading = false;
    }
    
    private async openEditor(id:string) {
        if(this.currentId) {
            $(`#${this.currentId}`).hide();
        }
        this.currentContent = this.contents.filter(t => t.id == id)[0];
        await this.loadContent(id, this.currentContent);
    }
    

    async openContent(content:Content) {
        this.currentContent = content;
        await this.loadContent(content.id, content);
    }

    private async loadContent(id: string, currentContent:Content, useCurrentValue?:boolean) {
        let populatedContent = await this.templateService.getContent(
            this.vertex.id,
            currentContent.name
        );
        if(this.modeIsEditing && !!!useCurrentValue) {
            let editor = ace.edit(this.contentEditorId);
            editor.getSession().setMode(this.typeToMode(currentContent['media-type']));
            editor.setValue(populatedContent.value);
            this.currentEditor = editor;
            this.currentId = id;
            $(`#${this.currentId}`).show();
            editor.resize(true);
            editor.renderer.updateFull(true);
        } else {
            if(useCurrentValue) {
                populatedContent.value = this.currentEditor.getValue();
            }
            let c = await this.templateService.getProperties(populatedContent);
            this.properties = c;
        }
    }

    private configureTabs(contents: Content[]) {
        this.contents = contents;
        if(contents && contents.length) {
            this.currentContent = contents[0];
            this.openEditor(this.currentContent.id);
        }
    }
    
    async saveCurrent() {
        await this.templateService.saveContent(
            this.vertex.id,
            {
                reference: this.currentContent.name,
                name: this.currentContent.name,
                value: this.currentEditor.getValue(),
                contentType: 'reference'
            }
        );
        this.dialogController.ok()
    }

    async saveNew() {
        let scriptName = this.scriptName;
        
        if(scriptName) {
            await this.templateService.saveContent(
                this.vertex.id,
                {
                    reference: this.scriptName,
                    name: this.scriptName,
                    mediaType: this.fileType,
                    value: '',
                    contentType: 'reference'
                }
            );
            this.contents = await this.templateService.getContents(this.vertex.id);
            this.configureTabs(this.contents);
            this.addPanelShowing = false;
            this.currentContent = this.contents.filter(t => t.name == this.scriptName)[0];
        }
    }
    
  

    private toggleAdd(event:Event) {
        if(this.addPanelShowing) {
            this.addPanelShowing = false;
        } else {
            this.addPanelShowing = true;
            ($(this.scriptType) as any).material_select();
            $($(this.scriptType)).on('change', (e, v) => {
                this.fileType = (e.target as any).value;
            });
        }
    }

    private typeToMode(mediaType: string) {
        let mode = SyntaxAwareTextEditor.typeMappings[mediaType];
        return mode;
    }
}