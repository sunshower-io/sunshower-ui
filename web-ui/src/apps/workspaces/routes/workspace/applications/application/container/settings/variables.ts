import {autoinject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-fetch-client";
import {NavigationInstruction} from "aurelia-router";
import {VariableDialog} from "./dialogs/variable";
import {DialogService} from "aurelia-dialog";

var parser = require('dockerfile-parser');

/**
 * Created by dustinlish on 2/21/17.
 */

@autoinject
export class Variables {

    private id: string;
    private workspaceId: string;

    private arguments: Argument[];

    constructor(private client: HttpClient,
                private dialogService: DialogService) {
    }

    private path(): string {
        return `workspaces/${this.workspaceId}/applications/${this.id}`
    }

    refresh(): void {
        this.client.fetch(`${this.path()}/workspace/file`, {
            method: 'put',
            body: JSON.stringify({
                path: 'Dockerfile'
            })
        })
            .then(t => t.json() as any)
            .then(t => {
                this.arguments = [];
                if (t.children.child && t.children.child.length > 0) {
                    let child = t.children.child[0];
                    this.client.fetch(`${this.path()}/workspace/${child.revision}`)
                        .then(t => t.json())
                        .then(t => {
                            var options = { includeComments: false };
                            var commands = parser.parse(t.text, options);
                            for (let cmd of commands) {
                                if (cmd.args instanceof Array) {
                                    this.add(cmd.name, cmd.args.join(' '));
                                }
                                else if (cmd.args instanceof Object) {
                                    let values = [];

                                    for (let key in cmd.args) {
                                        values.push(`${key} ${cmd.args[key]}`)
                                    }

                                    this.add(cmd.name, values);
                                }
                                else {
                                    this.add(cmd.name, cmd.args.replace(/\s+/g, " "));
                                }
                            }
                        });
                }
            });
    }

    activate(params: any, a: any, workspace: NavigationInstruction) {
        this.id = params.id;
        this.workspaceId = workspace.parentInstruction.parentInstruction.parentInstruction.params.id;
        this.refresh();
    }

    private add(type: string, args: string[]) {
        this.arguments.push(new Argument(type, args));
    }

    newVariable(): void {
        this.dialogService.open({
            viewModel: VariableDialog,
            model: {}
        }).then(response => {
            if (!response.wasCancelled) {
                this.refresh();
            } else {

            }
        });
    }
}

class Argument {
    constructor(
        public type: string,
        public args: string[]) {

    }
}