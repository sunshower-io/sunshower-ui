import {bindable} from "aurelia-framework";
import "chart.js";
import {HttpClient} from 'aurelia-fetch-client';
import {Provider} from "common/model/api/hal/api";
import {ChannelSet} from "common/lib/events/websockets";
import {Workspace} from "apps/workspaces/routes/workspace/index";
import {DialogService} from "aurelia-dialog";

import {autoinject} from "aurelia-dependency-injection";
import {UpdateInstance} from "./update/update-instance";


@autoinject
export class Instances {

    @bindable
    providers: Provider[];

    provider: Provider;

    @bindable
    instances: Instance[];

    @bindable
    loading: boolean;

    @bindable
    showModal;

    @bindable
    selectedApp;

    constructor(private parent: Workspace,
                private client: HttpClient,
                private channelSet: ChannelSet,
                private dialogService: DialogService
    ) {
        this.instances = [];
    }

    activate(): void {
        this.loading = true;
        this.parent.setMenuVisible(true);
    }

    attached(): void {
        $('.ui.dropdown').dropdown();

        this.refresh();

        this.channelSet.subscribe({
            type: 'compute',
            category: 'deployment'
        }).forEach(t => {
            this.refresh();
        });
    };


    createInstance(): void {
        this.parent.router.navigate('provisioning/wizard/catalog');
    }

    updateInstance(): void {
        this.dialogService.open({
            viewModel: UpdateInstance,

            // TODO get id from selected row in table
            model: this.selectedApp
            // model: "d75e4367-3502-44d5-a651-6c6ad3b2f3e9"
        }).then(t => {
        });
        console.log("updateInstance called");
        //this.updateInstanceForm.show();
    }

    openInstance(instance): void {
        this.parent.router.navigate(`instances/${instance.id}/instance`);
    }

    refresh(): void {
        this.loading = true;

        setTimeout(() => {
            this.client.fetch('provider')
                .then(d => d.json() as any)
                .then(d => {
                    this.providers = d;
                    console.log("Providers", d);
                    for (let provider of d) {
                        if (provider.key == 'aws') {
                            this.provider = provider;
                            this.client.fetch(`compute/${provider.id}/${this.channelSet.sessionId}/instances/synchronize`)
                                .then(d => d.json() as any)
                                .then(d => {
                                    this.instances = d;
                                    this.instances = this.createMockInstances();
                                    this.loading = false;
                                })
                        }
                    }
                })
                .catch(err => {
                    this.loading = false;
                    this.instances = this.createMockInstances();
                });
        }, 500)
    }

    stop(instance: Instance): void {
        this.client.fetch(`compute/${this.provider.id}/${this.channelSet.sessionId}/instances/${instance.id}/Stopped`)
            .then(r => {
                this.refresh();
            });
    }

    start(instance: Instance): void {
        this.client.fetch(`compute/${this.provider.id}/${this.channelSet.sessionId}/instances/${instance.id}/Starting`)
            .then(r => {
                this.refresh();
            });
    }

    restart(instance: Instance): void {
    }

    statusButtons(instance: Instance): string[] {
        if (instance.state == 'running') {
            return ['stop', 'restart']
        }
        else if (instance.state == 'stopped') {
            return ['start']
        }
        else {
            return []
        }
    }

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

    // TODO saves current selectedAppInstance
    selected() {
        console.log(this.selectedApp);
        return true;
    }

    createMockInstances(): Array<Instance> {
        let instances = [];
        for (var num in [1, 2, 3, 4]) {
            var i = new Instance();
            i.id = `1${num}`;
            i.logo = 'styles/themes/hasli/assets/images/logos/ca-logo.png';
            i.name = `CA UIM Server ${num}`;
            i.version = "8.47";
            i.state = "running";
            i.environment = "Hasli aws dev";
            i.vms = 3;
            i.containers = 3;

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
    environment ?: string;
    vms         ?: number;
    containers  ?: number;
}