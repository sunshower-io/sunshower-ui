import {
    autoinject,
    bindable
} from 'aurelia-framework';
import {
    Workspace,
    WorkspaceService
} from "apps/workspaces/lib/model/core/workspace";
import {Router} from "aurelia-router";


@autoinject
export class WorkspacesOverview {

    @bindable
    private workspaces: Workspace[];


    @bindable
    private content: HTMLElement;

    @bindable
    private panelActive: boolean;

    constructor(private workspaceService:WorkspaceService, private router:Router) {
    }


    open(id:string) {
        this.router.navigate(`${id}/dashboard`);
    }

    attached() : void {
        this.workspaceService.list().then(t => this.workspaces = t);
        if (this.panelActive) {
            $(this.content).removeClass('body-content-full')
        } else {
            $(this.content).addClass('body-content-full')
        }
    }

}