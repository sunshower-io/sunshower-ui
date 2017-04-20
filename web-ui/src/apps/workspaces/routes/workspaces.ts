import {
    autoinject,
    bindable
} from 'aurelia-framework';
import {
    Workspace,
    WorkspaceService
} from "apps/workspaces/lib/model/core/workspace";


@autoinject
export class WorkspacesOverview {

    @bindable
    private workspaces: Workspace[];


    @bindable
    private content: HTMLElement;

    @bindable
    private panelActive: boolean;

    constructor(private workspaceService:WorkspaceService) {
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