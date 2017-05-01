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
    private workspaces: any[];//Workspace[];


    @bindable
    private content: HTMLElement;

    @bindable
    private panelActive: boolean;

    constructor(private workspaceService:WorkspaceService, private router:Router) {
        this.workspaces = [];
    }


    open(id:string) {
        this.router.navigate(`${id}/dashboard`);
    }

    attached() : void {
        //this.workspaceService.list().then(t => this.workspaces = t);
        if (this.panelActive) {
            $(this.content).addClass('body-content-partial')
        } else {
            $(this.content).removeClass('body-content-partial')
        }
        this.workspaces.push({name: 'Boop', id: 'boop'});
        this.workspaces.push({name: 'Schloop', id: 'schloop'});
        this.workspaces.push({name: 'Beeping Boops', id: 'beeping-boops'});
        this.workspaces.push({name: 'glarbin', id: 'glarbin'});
    }

}