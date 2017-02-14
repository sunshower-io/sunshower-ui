import {
    bindable,
    inject
} from "aurelia-framework";

import {HttpClient} from 'aurelia-fetch-client';
import {Provider} from "common/model/api/hal/api";

import {Workspaces} from "apps/workspaces/routes/workspace/index";
@inject(Workspaces, HttpClient)
export class Instances {

    @bindable
    providers: Provider[];
    @bindable
    instances: Instance[];

    @bindable
    loading: boolean;

    constructor(private parent:Workspaces, private client:HttpClient) {
        this.instances = [];
    }

    activate() : void {
        this.parent.setMenuVisible(true);
    }

    attached(): void {
        this.refresh();
    };

    refresh(): void {
        this.loading = true;
        setTimeout(() => {
            this.client.fetch('provider')
                .then(d => d.json() as any)
                .then(d => {
                    this.loading = false;
                    this.providers = d;
                    for(let provider of d) {
                        this.client.fetch(`compute/${provider.id}/instances`)
                            .then(d => d.json() as any)
                            .then(d => console.log(d));
                    }
                });
        }, 2)
    }

    stop(instance:Instance) : void {
        instance.stop();
    }

    start(instance:Instance) : void {
        instance.start();
    }

    restart(instance:Instance) : void {
        instance.restart();
    }

}

//leaving this here so Josiah can put it wherever
export class Instance {
    logo    ?: string;
    name    ?: string;
    status  ?: string; //Running, Stopped, Stopping, Restart, Terminating, Deploying, Starting
    ip      ?: string;
    ports   ?: string;
    cpu     ?: number;
    memory  ?: number;
    disk    ?: number;

    statusCircle() : string {
        if (this.status == 'Running') {
            return 'circle green';
        }
        else if (this.status == 'Stopped') {
            return 'circle red';
        }
        else if (this.status == 'Starting' || this.status == 'Deploying' || this.status == 'Stopping') {
            return 'notched circle loading';
            //return 'ion-ios-loop-strong loading'
        }
        else {
            return 'circle yellow';
        }
        //returns class name for circle
    }

    statusButtons() : string[] {
        if (this.status == 'Running') {
            return ['stop', 'restart']
        }
        else if (this.status == 'Stopped') {
            return ['start']
        }
        else {
            return []
        }
        //returns names of allowable buttons
    }

    stop() : void {
        console.log('stopping ' + this.name);
    }

    start() : void {
        console.log('starting ' + this.name);
    }

    restart() : void {
        console.log('restarting ' + this.name);
    }
}