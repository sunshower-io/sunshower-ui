import {bindable} from "aurelia-framework";
import "chart.js";
import {Workspace} from "../../../../index";
import {HttpClient} from "aurelia-fetch-client";

/**
 * Created by dustinlish on 2/28/17.
 */

export class Overview {

    @bindable instances;
    @bindable loading;

    constructor(private parent: Workspace, private client: HttpClient) {
        this.instances = [];
    }

    attached() {
        this.refresh();
    }

    refresh(): void {
        this.loading = true;
        setTimeout(() => {
            this.instances = this.createMockInstances();
            this.loading = false;
        }, 500)
    }

    // TODO create as custom attribute
    computeStatus(instance: Instance): string {
        if (instance.state == 'running') {
            return 'circle green';
        }
        else if (instance.state == 'stopped') {
            return 'circle red';
        }
        else if (instance.state == 'starting' || instance.state == 'deploying' || instance.state == 'stopping') {
            return 'notched circle loading';
            //return 'ion-ios-loop-strong loading'
        }
        else {
            return 'circle yellow';
        }
    }


    // TODO delete after plugging into real service
    createMockInstances(): Array<Instance> {
        let instances = [];
        for (var num in [1, 2, 3]) {
            var i = new Instance();
            i.id = `1${num}`;
            i.logo = 'styles/themes/hasli/assets/images/logos/ca-logo.png';
            i.name = `CA UIM Server ${num}`;
            i.version = "8.47";
            i.state = "running";
            i.ip = `54.183.158.11${num}`;
            i.cpu = {labels: ["used", "free"], datasets: [{data: [30, 100], backgroundColor: ["#1EC38A", "#ECF0F1"], hoverBackgroundColor: ["#1EC38A"]}]};
            i.mem = {labels: ["used", "free"], datasets: [{data: [10, 100], backgroundColor: ["#1EC38A", "#ECF0F1"], hoverBackgroundColor: ["#1EC38A"]}]};
            i.disk = {labels: ["used", "free"], datasets: [{data: [34, 100], backgroundColor: ["#1EC38A", "#ECF0F1"], hoverBackgroundColor: ["#1EC38A"]}]};
            instances.push(i)
        }

        return instances;
    }
}

export class Instance {
    id          ?: string;
    logo        ?: string;
    name        ?: string;
    version     ?: string;
    state       ?: string; //Running, Stopped, Stopping, Restart, Terminating, Deploying, Starting
    ip          ?: string;
    cpu         ?: any;
    mem         ?: any;
    disk        ?: any;
}

