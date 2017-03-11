import {Workspace} from "apps/workspaces/routes/workspace/index";
import {bindable} from "aurelia-framework";
import {autoinject} from "aurelia-dependency-injection";
/**
 * Created by dustinlish on 3/4/17.
 */

@autoinject
export class Hosts {

    @bindable
    hosts: Host[];

    @bindable
    loading: boolean;

    constructor(private parent: Workspace,
    ) {
        this.hosts = [];
    }

    activate(): void {
        this.loading = true;
        this.parent.setMenuVisible(true);
    }

    attached(): void {
        this.refresh();
    };

    refresh(): void {
        setTimeout(() => {
            this.loading = true;
            this.hosts = this.createMockHosts();
            this.loading = false;
        }, 500)
    }

    computeStatus(host: Host): string {
        if (host.state == 'running') {
            return 'circle green';
        }
        else if (host.state == 'stopped') {
            return 'circle red';
        }
        else if (host.state == 'starting' || host.state == 'deploying' || host.state == 'stopping') {
            return 'notched circle loading';
            //return 'ion-ios-loop-strong loading'
        }
        else {
            return 'circle yellow';
        }
    }

    createMockHosts() {
        return [
            new Host("styles/themes/hasli/assets/images/logos/os/Ubuntu-48.png", `ubuntux64-1`, "2.0.0", "running", `10.238.0.51`, "22", 4, "4gb", "40gb", false),
            new Host("styles/themes/hasli/assets/images/logos/os/Ubuntu-48.png", `ubuntux64-2`, "1.0.0", "running", `10.238.0.52`, "22", 4, "4gb", "40gb", false),
            new Host("styles/themes/hasli/assets/images/logos/os/Red Hat-48.png", `rhelx64-1`, "not installed", "running", `10.238.1.5`, "22", 4, "4gb", "40gb", false),
            new Host("styles/themes/hasli/assets/images/logos/os/Suse-48.png", `susex64-1`, "not installed", "stopped", `10.238.2.5`, "22", 4, "4gb", "40gb", false),
            new Host("styles/themes/hasli/assets/images/logos/os/Suse-48.png", `susex64-2`, "not installed", "stopped", `10.238.2.51`, "22", 4, "4gb", "40gb", false),
            new Host("styles/themes/hasli/assets/images/logos/os/Windows8-48.png", `windows8-1`, "not installed", "running", `10.238.3.5`, "22", 4, "4gb", "40gb", false),
            new Host("styles/themes/hasli/assets/images/logos/os/Windows8-48.png", `windows8-2`, "not installed", "running", `10.238.4.5`, "22", 4, "4gb", "40gb", false)
        ];
    }

}

export class Host {
    os          ?: string;
    name        ?: string;
    version     ?: string;
    state       ?: string; //Running, Stopped, Stopping, Restart, Terminating, Deploying, Starting
    ip          ?: string;
    ports       ?: string;
    cpus        ?: number;
    mem         ?: string;
    disk        ?: string;
    showVersion ?: boolean;


    constructor(os: string, name: string, version: string, state: string, ip: string, ports: string, cpus: number, mem: string, disk: string, showVersion: boolean) {
        this.os = os;
        this.name = name;
        this.version = version;
        this.state = state;
        this.ip = ip;
        this.ports = ports;
        this.cpus = cpus;
        this.mem = mem;
        this.disk = disk;
        this.showVersion = showVersion;
    }
}