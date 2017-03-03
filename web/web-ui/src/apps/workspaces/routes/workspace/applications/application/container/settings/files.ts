import {autoinject, bindable} from "aurelia-framework";
/**
 * Created by dustinlish on 2/22/17.
 */
import {Application} from 'apps/workspaces/routes/workspace/applications/application/application';
import {Identifier} from "common/lib/lang";
import {HttpClient} from "aurelia-fetch-client";
import {File, Files as Fs} from 'apps/workspaces/model/io';

@autoinject
export class Files {

    @bindable
    loadingTable : boolean;

    id: string;

    @bindable
    parentList : File[]; //properly type this

    files : File;
    constructor(
        private parent:Application,
        private client:HttpClient
    ) {

    }

    attached() : void {
        this.openRoot();
    }

    openRoot() : void {
        this.parentList = [];
        this.loadingTable = true;
        this.id = this.parent.applicationRevision.id.id;
        // let parent = this.parent,
        //     rev = parent.applicationRevision,
        //     id = rev.id.id;

        this.client.fetch(`applications/${this.id}/files`)
            .then(t => t.json() as any)
            .then(t => {
                this.files = t;
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

    name(file:File) : string {
        return Fs.getName(file);
    }

    openFile(file:File) : void {
        console.log(this.parentList);
        if (file.directory) {
            let parentIndex = this.parentList.indexOf(file);
            if (parentIndex == -1) {
                this.parentList.push(file);
            } else {
                this.parentList = this.parentList.slice(0, parentIndex+1);
            }

            this.loadingTable = true;
            this.client.fetch(`applications/${this.id}/files/${file.id}/list`)
                .then(t => t.json() as any)
                .then(t => {
                    this.files = t;
                    this.loadingTable = false;
                });
        } else {
            console.log('someday I will open', file);
            //todo open it
        }
    }

    activate(revid: Identifier) {
    }

}