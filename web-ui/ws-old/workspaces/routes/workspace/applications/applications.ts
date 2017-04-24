
import {HttpClient} from 'aurelia-fetch-client';
import {bindable} from "aurelia-framework";

import {autoinject} from "aurelia-dependency-injection";
import {Application} from "common/model/api/application/model";
import {
    Workspace as WorkspaceElement
} from "common/model/api/workspace/model";

import {
    WorkspaceService,
} from "common/model/api/workspace/service";

import {
    Workspace as WorkspaceRoute
} from "apps/workspaces/routes/workspace/index";

@autoinject
export class Applications {

    @bindable
    applications: Application[];

    @bindable
    loading: boolean;

    @bindable
    showModal: boolean;

    @bindable
    workspace: WorkspaceElement;

    @bindable
    private id: string;


    constructor(
        public parent:WorkspaceRoute,
        private client:HttpClient,
        private workspaceManager:WorkspaceService
    ) {
        this.applications = [];
    }

    close() : void {
        this.showModal = false;
        this.refresh();
    }

    activate(params:any) : void {
        this.id = params.id;
        this.parent.setMenuVisible(true);
    }

    attached(): void {
        this.refresh();

        $('.ui.dropdown')
            .dropdown()
        ;

        $('.master.checkbox')
            .checkbox({
                // check all children
                onChecked: function() {
                    $('.ui.child.checkbox').checkbox('check');
                },
                // uncheck all children
                onUnchecked: function() {
                    $('.ui.child.checkbox').checkbox('uncheck');
                }
            })
        ;
    }

    refresh(): void {
        this.loading = true;
        this.workspaceManager.getApplications().then(d => {
            this.loading = false;
            this.applications = d;
        });
        this.workspace = this.workspaceManager.workspace;
   }

    create() : void {
        this.showModal = true;
    }

    addApplication() : void {
        this.parent.router.navigate('applications/new');
    }

    open(application: Application) : void {
        let id = application.id as any;
        this.parent.router.navigate(`applications/${id}/application`);
    }

    checkbox() {

    }

    private getDate(): string {
        let currentDate = new Date();
        return `${currentDate.getDay()}/${currentDate.getDate()}/${currentDate.getFullYear()} 
                at ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    }
}

export class Owner {
    private _id ?: string;

    constructor(id: string) {
        this._id = id;
    }

    get id(): string {
        return this._id;
    }
}