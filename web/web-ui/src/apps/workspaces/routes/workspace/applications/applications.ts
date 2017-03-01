
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
    }

    activate(id:any) : void {
        this.parent.setMenuVisible(true);
    }

    attached(): void {
        this.refresh();
    };

    refresh(): void {
        this.loading = true;
    }

    create() : void {
        this.showModal = true;
    }

    addApplication() : void {
        this.parent.router.navigate('applications/new');
    }
}

export class Application {
    logo    ?: string;
    name    ?: string;
    status  ?: string;
    ip      ?: string;
    ports   ?: string;
    cpu     ?: number;
    memory  ?: number;
    disk    ?: number;
}