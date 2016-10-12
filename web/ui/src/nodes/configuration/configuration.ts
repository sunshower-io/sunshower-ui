import 'ace';
import 'fetch';
import 'bootstrap';
import * as $ from 'jquery';
import 'jstree';

import 'datatables'

import {
    bindable, 
    autoinject, 
    TaskQueue
} from 'aurelia-framework';



import {
    RevisableDocument,
    ConfigurationService
} from '../../service/nodes/ConfigurationService';

import {
    HistoryService, 
    Revision, 
    Revisable
} from "../../service/history/HistoryService";


import {
    RemoteFileService, 
    RemoteFile
} from "../../service/files/FileService";

import {FileDialog} from "../../widgets/file/file-dialog";
import {CommitDialog} from "../../widgets/commit/commit-dialog";
import {HistoryDialog} from "../../widgets/history-view/history-dialog";

import Editor = AceAjax.Editor;
import {BlockchainService} from "../../service/blockchain/BlockchainService";
import {NodeService} from "../../service/nodes/NodeService";

@autoinject
export class Configuration {


    private tabContent:any;
    private tabElement:any;
    private editorContent:Element;


    private fileDialog:FileDialog;
    private commitDialog:CommitDialog;
    private historyDialog:HistoryDialog;

    private tree:any;
    
    @bindable()
    private nodes:Array<Node>;
    private table:any;
    private changedFiles:Array<Object>;
    private editors:Map<string, ConfigurationEditor>;


    @bindable()
    private commitMessage:Element;

    private blockContentView:Element;

    private revisions:Array<Array<String>>;


    constructor(
        private taskQueue:TaskQueue,
        private historyService:HistoryService,
        private fileService:RemoteFileService,
        private nodeService:NodeService,
        private blockchainService:BlockchainService,
        private configurationService:ConfigurationService
    ) {
        this.changedFiles = [];
        this.editors = new Map<string, ConfigurationEditor>();

    }
    
    
    showCommitDialog() : void {
        this.commitDialog.showDialog(this.nodes);
    }
    
    activate(params) {
        this.nodes = [this.nodeService.getElement(params.id)];
    }

    attached() {
        ace.config.set('basePath', 'jspm_packages/github/ajaxorg/ace-builds@1.2.3');
    }


    revisionOpened(event:CustomEvent):void {
        this.openRevisionById(event.detail.object);
    }

    openRevisionById(id:string):void {
        let revision = this.historyService.getRevision(id);
        this.openRevision(revision);
    }


    openFileDialog():void {
        this.fileDialog.showDialog();
    }


    public openFile(event:CustomEvent):void {
        let fileName = event.detail.fileName;
        this.fileService.load(
            new RemoteFile(fileName), (url, value) => {
                this.createTab(fileName, value)
            });

    }


    getFileName(url:string):string {
        return url.substring(url.lastIndexOf('/') + 1, url.length);
    }


    createId(fileName) {
        return this.normalize(fileName);
    }


    saveAll():void {
        for (var id in this.editors) {
            this.save(id);
        }
    }


    save(id:string) {
        if (id) {
            let editor = this.editors[id],
                value = editor.editor.getValue(),
                fileName = editor.fileName;
            editor.setChanged(false);
            this.configurationService.save(new RevisableDocument(id, fileName, value));
        }
    }

    private setChanged(id:string):void {
        let editor = this.editors[id];
        if (!editor.changed) {
            editor.setChanged();
        }
    }


    private createTab(url:string, text:string):void {
        let
            fileName = this.getFileName(url),
            tabId = this.createId(fileName),
            existingEditor = this.editors[tabId];
        if (existingEditor) {
            existingEditor.editor.setValue(text);
        } else {
            this.taskQueue.queueMicroTask(() => {
                let tab = this.addTab(fileName, tabId);
                this.addEditorTab(url, text, tabId, tab, fileName);
            });
        }
        this.focus(tabId);
    }

    private registerTabs(tabContent:any|Element, editorTab:any, editorContent:any) {
        tabContent.append(editorTab);
        editorTab.append(editorContent);
        $(this.editorContent).append(tabContent);
    }

    private openRevision(revision:Revision) {
        if (revision) {
            for (var revisable of revision.getRevisedObjects()) {
                this.openBlock(revisable);
            }
            this.historyDialog.hideDialog();
        }
    }

    private openBlock(revisable:Revisable) {
        let
            file = <RevisableDocument> revisable,
            data = file.data;
        this.createTab(file.name, data);
    }


    private blockOpened(event:CustomEvent):void {
        this.historyDialog.hideDialog();
        this.openBlock(event.detail.object);
    }


    private addEditorTab(url:string, text:string, id:string, tabHeader, fileName):void {
        let tabContent = this.getTabContent(),
            editorTab = this.createTabPanel(id),
            editorContent = $('<div style="position:absolute; width:100%; height:100%; overflow-y:auto;"></div>');
        this.registerTabs(tabContent, editorTab, editorContent);
        let editor = this.createEditor(editorContent, text, id);
        this.editors[id] = new ConfigurationEditor(
            id,
            fileName,
            editor,
            tabHeader,
            [editorTab, editorContent, tabHeader]
        );
    }


    private createEditor(editorContent:any, text:string, id:string) {
        let editor = ace.edit($(editorContent).get(0));
        editor.$blockScrolling = Infinity;
        editor.setTheme('ace/theme/chaos');
        editor.getSession().setMode('ace/mode/xml');
        editor.setValue(text);
        editor.on('change', (e) => this.setChanged(id));
        return editor;
    }


    private focus(id:string):void {
        $(this.editorContent).find(`li`).removeClass('active');
        $(this.editorContent).find(`.nav-tabs a[href="#${id}"]`).tab('show');
    }

    private createTabElement():Element {
        if (!this.tabElement) {
            this.tabElement = $('<ul class="nav nav-tabs" role="tablist""/>');
            $(this.editorContent).append(this.tabElement);

        }
        return this.tabElement;

    }


    private getTabContent() {
        if (!this.tabContent) {
            let tc =
                $('<div class="tab-content" style="height:100%; overflow:hidden; width:100%;">');
            $(this.tabElement).append(tc);
            return (this.tabContent = tc);
        } else {
            $(this.tabContent).find('.tab-pane').removeClass('active');
        }
        return this.tabContent;

    }

    private createTabPanel(id:string):any {
        return $(`<div class="tab-pane active" 
                    style="position:relative; 
                    height:100%; width:100%;overflow:hidden" 
                    id="${id}">`);
    }


    private normalize(id:string) {
        return id.replace(/\./g, '-');
    }

    private addTab(name:string, id:string):any {
        let te = this.createTabElement(),
            self = this,
            tabControl = $(`<a data-toggle="tab" class="editor-tab" href="#${id}" aria-controls="${id}">${name}</a>`),
            tabCloseControl = $(`<span class="tabclose">&times</span>`),
            tab = $(`<li id="${id}-tab" class="active">`);
        tab.append(tabControl);
        tabControl.append(tabCloseControl);
        tabControl.click(() => {
            this.focus(id);
        });
        tabCloseControl.click(f => {
            self.removeTab(id);
        });
        $(te).append(tab);
        return tab;
    }

    private removeTab(id:string):void {
        this.editors[id].destroy();
        delete this.editors[id];
        for (var k in this.editors) {
            if (this.editors.hasOwnProperty(k)) {
                this.focus(k);
                break;
            }
        }
    }
}

export class ConfigurationEditor {

    constructor(private id:string,
                private fileName:string,
                private editor:Editor,
                private element:Element,
                private elements:Array<any>,
                private changed:boolean = false) {

    }


    setChanged(changed:boolean = true):void {
        if (changed) {
            $(this.element).find('a').addClass('bold');
        } else {
            $(this.element).find('a').removeClass('bold');
        }
        this.changed = changed;
    }

    destroy():void {
        this.editor.destroy();
        this.elements.forEach(i => $(i).remove());
    }

}

