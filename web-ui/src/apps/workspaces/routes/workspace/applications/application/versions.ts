import {DialogService} from "aurelia-dialog";
import {autoinject} from "aurelia-dependency-injection";
import {Version} from "./dialogs/version";
import {bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {Identifier} from "../../../../../../common/lib/lang";
import {NavigationInstruction} from "aurelia-router";

/**
 * Created by dustinlish on 2/20/17.
 */

@autoinject
export class Versions {

    private workspaceId : string;
    private id: string;
    private latestVersion: string;

    @bindable
    currentVersions: Array<Version>;

    model: {};

    constructor(private client: HttpClient,
                private dialogService: DialogService) {
        this.currentVersions = [];
    }

    attached() {
        this.refresh();
    }


    private path() : string {
        return `workspaces/${this.workspaceId}/applications/${this.id}`
    }
    refresh() {
        this.client.fetch(`${this.path()}/workspace/log`)
            .then(t => t.json() as any)
            .then(t => {
                this.currentVersions = t;
            });
    }


    activate(params: any, a: any, workspace: NavigationInstruction) {
        this.id = params.id;
        this.workspaceId = workspace.parentInstruction.parentInstruction.params.id;
        this.refresh();
    }

    newVersion(): void {
        this.dialogService.open({
            viewModel: Version,
            model: {currentVersions: this.currentVersions, applicationId: this.id}
        }).then(response => {
            if (!response.wasCancelled) {
                this.refresh();
            } else {

            }
        });
    }

}

