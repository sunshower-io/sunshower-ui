import { bindable } from "aurelia-framework";

export class ApplicationsWidget {

    @bindable
    applications: Application[];


    attached(): void {
        this.applications = [];
    };

}


export class Application {
    name: string;
    status: string;
    ip: string;
    ports: string;
    cpu: string;
    memory: string;
}