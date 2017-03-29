import {autoinject, bindable} from "aurelia-framework";
/**
 * Created by dustinlish on 2/22/17.
 */
import {Application} from "common/model/api/core/application";
import {Identifier} from "common/lib/lang";
import {HttpClient} from "aurelia-fetch-client";
import {File} from 'apps/workspaces/model/io';
import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";
import {NavigationInstruction} from "aurelia-router";

@autoinject
export class Files {

    @bindable
    loadingTable : boolean;

    @bindable
    loadingFile : boolean;

    private id: string;
    private application: Application;
    private workspaceId: string;

    @bindable
    parentList : File[];

    @bindable
    activeFile : File;

    @bindable
    activeFileText : string;

    filePopup : HTMLElement;

    files : File[];


    constructor(
        private client:HttpClient,
        private incompleteFeature:IncompleteFeature
    ) {

    }

    attached() : void {
        //this.getApplication();
    }

    private path() : string {
        return `workspaces/${this.workspaceId}/applications/${this.id}`
    }

    private getApplication() : void {
        this.loadingTable = true;
        this.client.fetch(`workspaces/${this.workspaceId}/applications/${this.id}`)
            .then(t => t.json() as any)
            .then(t => {
                this.application = t;
                this.openRoot();
            });
    }

    openRoot() : void {
        this.parentList = [];
        this.loadingTable = true;

        if (this.application.repository) {
            this.client.fetch(`${this.path()}/workspace/file`, {
                method: 'put',
                body: JSON.stringify({
                    path: ''
                })
            })
                .then(t => t.json() as any)
                .then(t => {
                    this.files = t.children.child;
                    this.loadingTable = false;
                });
        } else {
            // let parent = this.parent,
            //     rev = parent.applicationRevision,
            //     id = rev.id.id;
            //
            // this.client.fetch(`applications/${this.id}/files`)
            //     .then(t => t.json() as any)
            //     .then(t => {
            //         this.files = t;
            //         this.loadingTable = false;
            //     });
        }

    }

    style(file: File) : string {
        if(file.directory) {
            return "blue ion-ios-folder-outline icon file-icons_small";
        } else {
            return "grey file outline icon"
        }
    }


    openFile(file:File, $event: Event) : void {
        // this.incompleteFeature.notify($event);
        if (file.directory) {
            let parentIndex = this.parentList.indexOf(file);
            if (parentIndex == -1) {
                this.parentList.push(file);
            } else {
                this.parentList = this.parentList.slice(0, parentIndex+1);
            }

            this.loadingTable = true;
            if (this.application.repository) {
                this.client.fetch(`${this.path()}/workspace/file`, {
                    method: 'put',
                    body: JSON.stringify({
                        path: `${file.name}/`
                    })
                })
                    .then(t => t.json() as any)
                    .then(t => {
                        this.files = t.children.child;
                        this.loadingTable = false;
                    });
            } else {
                this.incompleteFeature.notify($event);
                // this.client.fetch(`applications/${this.id}/files/${file.id}/list`)
                //     .then(t => t.json() as any)
                //     .then(t => {
                //         this.files = t;
                //         this.loadingTable = false;
                //     });
            }
        } else {
            this.incompleteFeature.notify($event);
            // this.setActiveFile(file);
        }
    }

    setActiveFile(file:File) : void {
        // this.activeFile = file;
        // $(this.filePopup).modal('show');
        // this.loadingFile = true;
        // this.client.fetch(`applications/${this.id}/files/${file.id}`)
        //     .then(t => t.json() as any)
        //     .then(t => {
        //         this.activeFileText = t.data;
        //         this.loadingFile = false;
        //     });
    }

    saveFile(file:File) : void {
        // this.loadingFile = true;
        // this.client.fetch(`applications/${this.parent.application.id}/files/${file.id}`, {
        //         method: 'post',
        //         body: JSON.stringify({data: this.activeFileText})
        //     })
        //     .then(t => t.json() as any)
        //     .then(t => {
        //         this.loadingFile = false;
        //         $(this.filePopup).modal('hide');
        //         this.activeFile = null;
        //         this.activeFileText = '';
        //     });
    }

    activate(params: any, a: any, workspace: NavigationInstruction) {
        this.id = params.id;
        this.workspaceId = workspace.parentInstruction.parentInstruction.parentInstruction.params.id;
        this.getApplication();
    }

}