import {
    bindable,
    inject,
    CompositionTransaction
} from "aurelia-framework";
import "chart.js";
import {HttpClient} from 'aurelia-fetch-client';
import {Provider} from "common/model/api/hal/api";
import {ChannelSet} from "common/lib/events/websockets";
import {Workspace} from "apps/workspaces/routes/workspace/index";


@inject(
    Workspace,
    HttpClient,
    ChannelSet
)
export class Instances {

    @bindable
    providers: Provider[];

    provider: Provider;

    @bindable
    instances: Instance[];

    @bindable
    loading: boolean;

    totalInstancesData;
    totalInstanceStatuses;

    constructor(private parent: Workspace,
                private client: HttpClient,
                private channelSet: ChannelSet
    ) {
        this.instances = [];
    }

    activate(): void {
        this.loading = true;

        this.parent.setMenuVisible(true);

        this.totalInstancesData = this.getInstancesData();
        this.totalInstanceStatuses = this.getInstanceStatuses();
    }

    attached(): void {
        this.refresh();

        this.channelSet.subscribe({
            type: 'compute',
            category: 'deployment'
        }).forEach(t => {
            this.refresh();
        });
    };


    createInstance(): void {
        this.parent.router.navigate('instances/new');
    }

    refresh(): void {
        setTimeout(() => {


            this.client.fetch('provider')
                .then(d => d.json() as any)
                .then(d => {
                    this.loading = false;
                    this.providers = d;
                    console.log("Providers", d);
                    for (let provider of d) {
                        if (provider.key == 'aws') {
                            this.provider = provider;
                            this.client.fetch(`compute/${provider.id}/${this.channelSet.sessionId}/instances/synchronize`)
                                .then(d => d.json() as any)
                                .then(d => this.instances = d);
                        }
                    }
                });
        }, 2)
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
        //returns class name for circle

    }

    private getInstancesData() {
        let primaryColor = "rgba(56, 155, 255, .8)";
        let backgroundColor = "rgba(246, 249, 255, 0.4)";

        return {
            labels: ["", "Oct'16'", "Nov'16'", "Dec '16'", "Jan'17'", "Feb'17'"],
            datasets: [
                {
                    radius: 0,
                    label: "Commits",
                    lineTension: 0.0,
                    fill: false,
                    borderJoinStyle: 'miter',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderWidth: 2,
                    borderColor: primaryColor,
                    backgroundColor: backgroundColor,
                    data: [0, 4, 5, 0, 0, 6]
                }
            ]
        };
    }

    private getInstanceStatuses() {
        let primaryColor = "rgba(56, 155, 255, .8)";
        let backgroundColor = "rgba(246, 249, 255, 0.4)";

        return {
            labels: ["" ,"10:05", "10:10", "10:15", "10:20", "10:25", "10:30"],
            datasets: [
                {
                    radius: 0,
                    label: "Running",
                    lineTension: 0.0,
                    fill: false,
                    borderJoinStyle: 'miter',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderWidth: 2,
                    borderColor: "#36C68C",
                    backgroundColor: backgroundColor,
                    data: [1, 3, 4, 5, 5, 5, 6, 6]
                }
                // }
            ]
        };
    }
}

export class Instance {
    id          ?: string;
    logo        ?: string;
    name        ?: string;
    state       ?: string; //Running, Stopped, Stopping, Restart, Terminating, Deploying, Starting
    publicIp    ?: string;
    ports       ?: string;

}