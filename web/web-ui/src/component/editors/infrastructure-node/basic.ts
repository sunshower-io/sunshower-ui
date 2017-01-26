import {inject, bindable} from 'aurelia-framework';
import {InfrastructureNode} from "component/model/infrastructure-node";
import {ElementEditor, EditorMode} from "canvas/element/element";
import {OperatingSystemService} from 'model/os';
import {UUID} from "utils/uuid";
import {HttpClient} from "aurelia-fetch-client";
import {InstanceDescriptor, NodeConfiguration} from "model/hal/api";
import {json} from "aurelia-fetch-client";

@inject(HttpClient, OperatingSystemService)
export class BasicInfrastructureNodeEditor implements ElementEditor<InfrastructureNode> {

    @bindable
    mode: EditorMode;
    providers: HTMLElement;
    list: HTMLElement;
    instanceType: HTMLElement;


    @bindable
    private node: InfrastructureNode;

    private searching: boolean;


    private configuration: NodeConfiguration;

    instanceTypes: InstanceDescriptor;

    constructor(private client: HttpClient,
                private osService: OperatingSystemService) {


    }

    open(node: InfrastructureNode): void {
        this.node = node;
        this.configuration = node.configuration;
    }

    search(): void {
        if (!this.searching) {
            this.searching = true;
            this.client.fetch('search/compute/search', {
                method: 'post',
                body: json(this.configuration)
            }).then(response => response.json() as any)
                .then(data => {
                    this.instanceTypes = data;
                    this.searching = false;
                }).catch(r => {
                    this.client.fetch('search/compute')
                        .then(data => data.json() as any)
                        .then(data => {
                            this.instanceTypes = data;
                            this.searching = false;
                        });

            });
        }
    }


    osChanged = (value: string, text: any, item: any) => {
        this.node.setOperatingSystem(this.osService.get(UUID.fromString(value)));
    };

    attached(): void {
        setTimeout(() => {
            $(this.providers).dropdown();
            $(this.list).dropdown({
                action: 'activate',
                onChange: this.osChanged,
            });
            $(this.instanceType).dropdown();
            if (this.node && this.node.operatingSystem) {
                $(this.list).dropdown('set selected', this.node.operatingSystem.id);
            }
        });
    }

    activate(model: EditorMode): void {
        this.mode = model;
    }
}