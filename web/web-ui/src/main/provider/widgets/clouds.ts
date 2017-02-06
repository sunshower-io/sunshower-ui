import { bindable } from "aurelia-framework";

export class CloudsWidget {

    @bindable
    clouds: Cloud[];


    attached(): void {
        this.clouds = [];
    };
    
}

export class Cloud {
    name: string;
    status: string;
    ip: string;
    ports: string;
    cpu: string;
    memory: string;
}