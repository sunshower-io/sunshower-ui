
import {HttpClient} from 'aurelia-fetch-client';
import {bindable, inject} from "aurelia-framework";
import {Workspace} from "apps/workspaces/routes/workspace/index";


@inject(Workspace, HttpClient)
export class Applications {

    @bindable
    applications: Application[];

    @bindable
    loading: boolean;

    @bindable
    showModal: boolean;

    constructor(public parent:Workspace, private client:HttpClient) {
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
    };

    refresh(): void {
        this.loading = true;
        setTimeout(() => {
            this.client.fetch('applications')
                .then(d => d.json() as any)
                .then(d => {
                    this.loading = false;
                    // this.applications = d;

                    // TODO plug into application service
                    this.applications = [
                        new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA Full Stack", "8.47", "running", 5, 4, this.getDate(), new Owner("Dustin Lish")),
                        new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA UIM", "8.47", "running", 1, 1, this.getDate(), new Owner("Dustin Lish")),
                        new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA UMP", "8.47", "running", 1, 1, this.getDate(), new Owner("Dustin Lish")),
                        new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA MySql", "5.6", "running", 1, 1, this.getDate(), new Owner("Dustin Lish")),
                        new Application("styles/themes/hasli/assets/images/logos/ca-logo.png", "CA Robot", "8.47", "running", 5, 1, this.getDate(), new Owner("Dustin Lish")),
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

    private getDate(): string {
        let currentDate = new Date();
        return `${currentDate.getDay()}/${currentDate.getDate()}/${currentDate.getFullYear()} 
                at ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    }
}

export class Application {
    logo       ?: string;
    name       ?: string;
    version    ?: string;
    status     ?: string;
    instances  ?: number;
    containers ?: number;
    modified   ?: string;
    owner      ?: Owner;


    constructor(logo: string, name: string, version: string, status: string, instances: number, containers: number, modified: string, owner: Owner) {
        this.logo = logo;
        this.name = name;
        this.version = version;
        this.status = status;
        this.instances = instances;
        this.containers = containers;
        this.modified = modified;
        this.owner = owner;
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