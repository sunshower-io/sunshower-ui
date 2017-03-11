import {autoinject} from "aurelia-dependency-injection";
/**
 * Created by dustinlish on 2/22/17.
 */
import {Application} from 'apps/workspaces/routes/workspace/applications/application/application';
import {Identifier} from "common/lib/lang";
import {HttpClient} from "aurelia-fetch-client";
import {File, Files as Fs} from 'apps/workspaces/model/io';

@autoinject
export class Files {

    files : File;
    constructor(
        private parent:Application,
        private client:HttpClient
    ) {

    }

    attached() : void {
        let parent = this.parent,
            rev = parent.applicationRevision,
            id = rev.id.id;


        this.client.fetch(`applications/${id}/files`)
            .then(t => t.json() as any)
            .then(t => this.files = t);

    }

    style(file: File) {
        if(file.directory) {
            return "blue ion-ios-folder-outline icon file-icons_small";
        } else {
            return "grey file outline icon"

        }
    }

    name(file:File) {
        return Fs.getName(file);
    }

    activate(revid: Identifier) {
    }

}