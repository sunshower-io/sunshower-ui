
import {HttpClient} from 'aurelia-fetch-client';
import {bindable} from "aurelia-framework";

import {Workspace as WorkspaceRoute} from "apps/workspaces/routes/workspace/index";
import {WorkspaceRevision} from "apps/workspaces/model/workspaces/workspace";
import {autoinject} from "aurelia-dependency-injection";
import {Application} from "common/model/api/core/application";
import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";

@autoinject
export class Applications {

    @bindable
    applications: Application[];

    @bindable
    loading: boolean;

    @bindable
    showModal: boolean;

    @bindable
    workspace: WorkspaceRevision;

    @bindable
    private id: string;


    constructor(
        public parent:WorkspaceRoute,
        private client:HttpClient,
        private incompleteFeature:IncompleteFeature
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
        setTimeout(() => {
            this.client.fetch(`workspaces/${this.id}/applications`)
                .then(d => d.json() as any)
                .then(d => {
                    this.loading = false;
                    this.applications = d.map(t => {
                        t.workspaceId = this.id;
                        return t;
                    });
                })
                .catch(err => {
                    this.loading = false;
                });
        }, 500)
    }

    create() : void {
        this.showModal = true;
    }

    addApplication() : void {
        this.parent.router.navigate('applications/new');
    }

    open(application: Application) : void {
        let id = application.id as any;
        this.client.fetch(`applications/${id.id}`)
            .then(t => t.json() as any)
            .then(t => {
                this.parent.router.navigate(`applications/${t.application.id}/application`);
            })
            .catch(err => {
                console.log(err);
            });
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