import { bindable } from "aurelia-framework";

export class InstancesWidget {

    @bindable
    instances: Instance[];


    attached(): void {
        this.instances = [];
    };

}


export class Instance {
    name: string;
    status: string;
    ip: string;
    ports: string;
    cpu: string;
    memory: string;
}