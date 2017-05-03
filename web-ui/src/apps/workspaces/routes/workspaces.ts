import {autoinject, bindable} from 'aurelia-framework';
import {Workspace, WorkspaceService} from "apps/workspaces/lib/model/core/workspace";
import {Router} from "aurelia-router";
import {DialogService} from "aurelia-dialog";
import {CreateWorkspace} from "./workspace/create/create";


@autoinject
export class WorkspacesOverview {

    @bindable
    private workspaces: Workspace[];


    @bindable
    private content: HTMLElement;

    @bindable
    private createBtn: HTMLElement;

    @bindable
    private panelActive: boolean;

    constructor(private workspaceService:WorkspaceService,
                private router:Router,
                private dialogService:DialogService) {
        this.workspaces = [];
        // this.panelActive = true;
    }

    attached() : void {
        this.workspaceService.list().then(t => this.workspaces = t);
        if (this.panelActive) {
            this.content.classList.add('body-content-partial');
            this.createBtn.classList.add('body-panel-open');
        } else {
            this.content.classList.remove('body-content-partial');
            this.createBtn.classList.remove('body-panel-open');
        }
    }

    create() {
        this.dialogService.open({
            viewModel: CreateWorkspace
        }).then(t => {
            console.log(t);
            // this.open(t.id);
        });
    }

}