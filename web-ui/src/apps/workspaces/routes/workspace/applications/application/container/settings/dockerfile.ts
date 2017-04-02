/**
 * Created by dustinlish on 2/22/17.
 */

import * as ace from 'ace';
import {autoinject} from "aurelia-framework";
import {NavigationInstruction} from "aurelia-router";
import {HttpClient} from "aurelia-fetch-client";


@autoinject
export class Dockerfile {

    private id: string;
    private workspaceId: string;


    private editor:HTMLElement;

    constructor(private client:HttpClient) {
        let a = ace as any;
        a.config.set('basePath', '/jspm_packages/github/ajaxorg/ace-builds@1.2.6');
    }

    private path() : string {
        return `workspaces/${this.workspaceId}/applications/${this.id}`
    }

    refresh() : void {
        // this.client.fetch(`${this.path()}/workspace/file`, {
        //     method: 'put',
        //     body: JSON.stringify({
        //         path: 'Dockerfile'
        //     })
        // })
        //     .then(t => t.json() as any)
        //     .then(t => {
        //         if(t.children.child && t.children.child.length > 0) {
        //             let child = t.children.child[0];
        //             this.client.fetch(`${this.path()}/workspace/${child.revision}`)
        //                 .then(t => t.json())
        //                 .then(t => {
        //                     let editor = ace.edit('editor');
        //                     editor.setTheme('ace/theme/clouds_midnight');
        //                     editor.getSession().setMode('ace/mode/yaml');
        //                     editor.setValue((t as any).text);
        //                 });
        //         }
        //     });
    }

    attached() : void {
        this.refresh();
    }

    activate(params: any, a: any, workspace: NavigationInstruction) {
        this.id = params.id;
        this.workspaceId = workspace.parentInstruction.parentInstruction.parentInstruction.params.id;
        this.refresh();
    }

}