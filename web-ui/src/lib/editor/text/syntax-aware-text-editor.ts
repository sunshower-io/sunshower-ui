import 'ace'
import {autoinject} from "aurelia-dependency-injection";
import {OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template/service";
import {Vertex} from "lib/designer/model/graph/vertex";
import Editor = AceAjax.Editor;
import {DialogController, DialogService} from "aurelia-dialog";

@autoinject
export class SyntaxAwareTextEditor {

    private vertex: Vertex;

    private editor: HTMLElement;
    private initialized: Editor;
    loading: boolean = true;

    private value: string;
    constructor(private dialogController: DialogController,
                private templateService: OrchestrationTemplateService) {
        (ace as any).config.set('basePath', 'jspm_packages/github/ajaxorg/ace-builds@1.2.6');
    }


    bind() {
        let editor = ace.edit(this.editor);
        editor.getSession().setMode("ace/mode/json");
        editor.resize(true);
        editor.renderer.updateFull(true);
        this.initialized = editor;
    }

    activate(vertex: Vertex): void {
        this.vertex = vertex;
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