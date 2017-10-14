import 'ace'
export class SyntaxAwareTextEditor {
  
    private editor: HTMLElement;
    
    constructor() {
        (ace as any).config.set('basePath', 'jspm_packages/github/ajaxorg/ace-builds@1.2.6');
    }
    
    
    bind() {
        let editor = ace.edit(this.editor);
        editor.getSession().setMode("ace/mode/json");
        editor.resize(true);
        editor.renderer.updateFull(true);
    }
}