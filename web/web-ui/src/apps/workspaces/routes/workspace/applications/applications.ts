
import {HttpClient} from 'aurelia-fetch-client';
import {bindable} from "aurelia-framework";
import {Workspace as WorkspaceRoute} from "apps/workspaces/routes/workspace/index";
import {WorkspaceRevision} from "apps/workspaces/model/workspaces/workspace";
import {autoinject} from "aurelia-dependency-injection";
import {Application} from "common/model/api/core/application";
import {User} from "../../../../../common/model/security/user";


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
    private id: any;

    constructor(
        public parent:WorkspaceRoute,
        private client:HttpClient,
    ) {
        this.applications = [];
    }


    activate(id:any) : void {
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
            this.client.fetch(`workspaces/${this.parent.hostWorkspace.id}/applications/heads`)
                .then(d => d.json() as any)
                .then(d => {
                    this.loading = false;
                    this.applications = d;

                    // // TODO plug into application service
                    // let user = new User();
                    // user.firstname = "Dustin";
                    // user.lastname = "Lish";
                    // this.applications = [
                    //     new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA Full Stack", "8.47", "running", 5, 4, this.getDate(), user),
                    //     new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA UIM", "8.47", "running", 1, 1, this.getDate(), user),
                    //     new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA UMP", "8.47", "running", 1, 1, this.getDate(), user),
                    //     new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA MySql", "5.6", "running", 1, 1, this.getDate(), user),
                    //     new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA Robot", "8.47", "running", 5, 1, this.getDate(), user),
                    //     new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA Azure Probe", "8.47", "running", 5, 1, this.getDate(), user),
                    //     new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA AWS Probe", "8.47", "running", 5, 1, this.getDate(), user)
                    // ];
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
        let id = application.id;
        this.client.fetch(`applications/${id}`)
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