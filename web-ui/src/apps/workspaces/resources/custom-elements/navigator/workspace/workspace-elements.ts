import {Materialize} from 'materialize-css';
import {LinkObject} from "../navigator-element";
import {WorkspaceService} from "common/model/api/workspace/service";
import {Router} from "aurelia-router";
import {Workspace, SaveWorkspaceRequest} from "common/model/api/workspace/model";
export class CreateWorkspaceObject implements LinkObject {
    name: string;

    constructor(
        private nav: WorkspaceService,
        private key: string,
        private router: Router
    ) {
        this.name = `Nothing named ${key} found.  Create it?`
    }

    open(): Promise<any> {
        return this.nav.save(new SaveWorkspaceRequest({
            name: this.key,
            key: this.key,
        })).then(t => {
            Materialize.toast(`Successfully created workspace '${this.key}'`, 2000);
            return new WorkspaceLinkObject(t, this.router, this.nav).open();
        })
    }
}

export class WorkspaceLinkObject implements LinkObject {
    name: string;


    constructor(private workspace: Workspace,
                private router: Router,
                private service:WorkspaceService,
    ) {
        this.name = `${workspace.name} (key: ${workspace.key})`;
    }

    open(): Promise<any> {
        return Promise.resolve(null);
        // return Promise.resolve(this.router
        //     .navigate(`workspace/${this.workspace.id}`));
    }

}
