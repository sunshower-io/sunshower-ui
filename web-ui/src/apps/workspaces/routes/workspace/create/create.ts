import {UUID} from "lib/common/lang/uuid";
import {bindable, autoinject} from "aurelia-framework";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace";
import {DialogController} from "aurelia-dialog";
import {SaveWorkspaceRequest} from "apps/workspaces/lib/model/core/workspace/model";
import { ConstraintViolationException } from "lib/common/service";
import {Router} from "aurelia-router";

@autoinject
export class CreateWorkspace {
    private nameId: string = UUID.random();
    private descriptionId: string = UUID.random();
    constraintViolation: ConstraintViolationException;

    @bindable
    private workspace: SaveWorkspaceRequest;

    @bindable
    private showError:boolean;

    @bindable
    private error: string;

    constructor (private controller:DialogController,
        private workspaceService:WorkspaceService,
        private router:Router) {
        this.workspace = new SaveWorkspaceRequest();
    }

    activate() : void {

    }

    save() {
        // this.workspace.bindFiles(this.files);
        this.workspaceService.save(this.workspace)
            .catch(err => {
                // this.constraintViolation = err;
                this.showError = true;
                this.error = err.statusText;
            })
            .then(result => {
                if(result) {
                    this.complete();
                    this.router.navigate(`workspaces/${result.id}/dashboard`)
                }
            });
    }

    complete() : void {
        this.controller.ok();
    }

}