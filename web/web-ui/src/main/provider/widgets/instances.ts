import { bindable } from "aurelia-framework";

export class InstancesWidget {

    @bindable
    instances: Instance[];

    @bindable
    loading: boolean;


    attached(): void {
        this.instances = [
            {
                logo: 'http://i.crn.com/logos/ca_technologies.jpg',
                name: 'CA UIM Azure Probe',
                status: 'Running',
                ip: '10.238.0.2',
                ports: '8080',
                cpu: 40,
                memory: 40,
                disk: 40
            }
                ];
    };

    refresh(): void {
        this.loading = true;
    }

}

//leaving this here so Josiah can put it wherever
export class Instance {
    logo    ?: string;
    name    ?: string;
    status  ?: string;
    ip      ?: string;
    ports   ?: string;
    cpu     ?: number;
    memory  ?: number;
    disk    ?: number;
}