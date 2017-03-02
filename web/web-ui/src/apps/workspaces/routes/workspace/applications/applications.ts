
import {HttpClient} from 'aurelia-fetch-client';
import {bindable} from "aurelia-framework";
import {Workspace} from "apps/workspaces/routes/workspace/index";
import {WorkspaceRevision} from "apps/workspaces/model/workspaces/workspace";
import {autoinject} from "aurelia-dependency-injection";
import {Application} from "../../../../../common/model/api/core/application";
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
    showModal2: boolean;

    constructor(
        public parent:Workspace,
        private client:HttpClient,
    ) {
        this.applications = [];
    @bindable
    workspace: WorkspaceRevision;

    constructor(
        public parent:Workspace,
        private client:HttpClient
    ) {
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
            this.client.fetch('applications')
                .then(d => d.json() as any)
                .then(d => {
                    this.loading = false;
                    // this.applications = d;

                    // TODO plug into application service
                    let user = new User();
                    user.firstname = "Dustin";
                    user.lastname = "Lish";
                    this.applications = [
                        new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA Full Stack", "8.47", "running", 5, 4, this.getDate(), user),
                        new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA UIM", "8.47", "running", 1, 1, this.getDate(), user),
                        new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA UMP", "8.47", "running", 1, 1, this.getDate(), user),
                        new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA MySql", "5.6", "running", 1, 1, this.getDate(), user),
                        new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA Robot", "8.47", "running", 5, 1, this.getDate(), user)
                    ];
                });
        }, 500)
    }

    create() : void {
        this.showModal = true;
    }

    addApplication() : void {
        this.parent.router.navigate('applications/new');
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