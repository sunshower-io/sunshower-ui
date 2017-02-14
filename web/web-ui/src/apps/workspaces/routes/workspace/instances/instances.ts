import {
    bindable,
    inject
} from "aurelia-framework";

import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Instances {

    @bindable
    instances: Instance[];

    @bindable
    loading: boolean;

    constructor(private client:HttpClient) {
        this.instances = [];
    }

    attached(): void {
        this.refresh();

        // let myInstance = new Instance,
        //     myOtherInstance = new Instance;
        // //myInstance.logo = 'http://www.prescientdigital.com/about-us/case-studies-1/calogo.jpg';
        // myInstance.name = 'A name';
        // myInstance.status = 'Running';
        // myOtherInstance.logo = '';
        // myOtherInstance.name = 'Booped';
        // myOtherInstance.status = 'Stopping';
        // this.instances.push(myInstance);
        // this.instances.push(myOtherInstance);
    };

    refresh(): void {
        this.loading = true;
        setTimeout(() => {
            this.client.fetch('compute')
                .then(d => d.json() as any)
                .then(d => {
                    this.loading = false;
                    this.instances = d;
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