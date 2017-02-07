
import {bindable} from "aurelia-framework";

export class Applications {

    @bindable
    applications: Application[];

    @bindable
    loading: boolean;

    attached(): void {
        this.applications = [''];
    };

    refresh(): void {
        this.loading = true;
    }

}

//leaving this here so Josiah can put it wherever
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