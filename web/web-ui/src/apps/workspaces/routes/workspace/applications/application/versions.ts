import {DialogService} from "aurelia-dialog";
import {autoinject} from "aurelia-dependency-injection";
import {Version} from "./dialogs/version";
import {bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {Identifier} from "../../../../../../common/lib/lang";

/**
 * Created by dustinlish on 2/20/17.
 */

@autoinject
export class Versions {

    private latestVersion: string;
    private id: string;

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

    activate(id: Identifier) {
        this.id = id.id;
    }

    refresh() {
        this.client.fetch(`applications/${this.id}/revisions`)
            .then(t => t.json() as any)
            .then(t => {
                this.currentVersions = t;
            });
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

