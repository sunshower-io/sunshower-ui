import {autoinject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-fetch-client";
import {NavigationInstruction} from "aurelia-router";
import {VariableDialog} from "./dialogs/variable";
import {DialogService} from "aurelia-dialog";
import {InstructionParser} from "common/lib/utils/instruction-parser";
import {Variable} from "common/model/common/variable";
import * as parser from 'node-docker-file-parser';

/**
 * Created by dustinlish on 2/21/17.
 */

@autoinject
export class Variables {

    private id: string;
    private workspaceId: string;

    private variables: Array<Variable>;

    constructor(private client: HttpClient,
                private dialogService: DialogService,
                private parser: InstructionParser ) {
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
                this.variables = [];
                if (t.children.child && t.children.child.length > 0) {
                    let child = t.children.child[0];
                    this.client.fetch(`${this.path()}/workspace/${child.revision}`)
                        .then(t => t.json())
                        .then(t => {
                            var options = { includeComments: false };
                            this.variables = this.parser.parseInstructionSet(parser.parse(t.text, options));
                        });
                }
            });
    }

    activate(params: any, a: any, workspace: NavigationInstruction) {
        this.id = params.id;
        this.workspaceId = workspace.parentInstruction.parentInstruction.parentInstruction.params.id;
        this.refresh();
    }

    private newVariable(): void {
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

