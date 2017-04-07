import {autoinject, bindable} from "aurelia-framework";
/**
 * Created by dustinlish on 2/22/17.
 */
import {File} from 'common/lib/io';
import {Application} from "common/model/api/application/model";
import {ApplicationService} from "common/model/api/application/service";

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


    private names:Map<string, boolean>;



    constructor(
        private applicationService: ApplicationService
    ) {

    }

    attached() : void {
        this.openRoot();
    }


    openRoot() : void {
        this.names = new Map<string, boolean>();
        this.parentList = [];
        this.loadingTable = true;
        this.applicationService.ls('/').then(t => {
            this.files = t.filter(u => !this.names.has(this.name(u.name)));
            this.loadingTable = false;
        });
    }

    style(file: File) : string {
        if(file.directory) {
            return "blue ion-ios-folder-outline icon file-icons_small";
        } else {
            return "grey file outline icon"
        }
    }


    openFile(file:File, $event: Event) : void {
        let name = this.name(file.name);
        if (file.directory) {
            let parentIndex = this.parentList.indexOf(file);
            if (parentIndex == -1) {
                if(!this.names.has(name)) {
                    this.names.set(name, true);
                    this.parentList.push(file);
                }
            } else {
                this.names.delete(name);
                this.parentList = this.parentList.slice(0, parentIndex + 1);
            }

            this.loadingTable = true;

            this.applicationService.ls(file.name).then(t => {
                this.files = t;
                this.loadingTable = false;

            });
        }
    }

    private name(file:string) : string {
        return file.split('/').pop();
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


}

