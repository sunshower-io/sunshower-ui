import {autoinject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-fetch-client";
import {NavigationInstruction} from "aurelia-router";
/**
 * Created by dustinlish on 2/21/17.
 */

@autoinject
export class Args {

    private id: string;
    private workspaceId: string;

    private arguments: Argument[];

    constructor(private client: HttpClient) {

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
                            this.parseAndGenerate((t as any).text);
                        });
                }
            });
    }

    private parseAndGenerate(text: string) {

        text.split("\n").map(t => t.trim()).filter(t => t != "").forEach(t => {
            let values = t.split(/\s+/);
            this.add(values[0], values.splice(1));
        });
    }

    attached(): void {
    }

    activate(params: any, a: any, workspace: NavigationInstruction) {
        this.id = params.id;
        this.workspaceId = workspace.parentInstruction.parentInstruction.parentInstruction.params.id;
        this.refresh();
    }

    private add(type: string, args: string[]) {
        this.arguments.push(new Argument(type, args));
    }
}

class Argument {
    constructor(public type: string, public args: string[]) {

    }
}