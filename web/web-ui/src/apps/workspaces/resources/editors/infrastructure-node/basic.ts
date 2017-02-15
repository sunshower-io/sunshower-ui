import {UUID} from "common/lib/utils";
import {json} from "aurelia-fetch-client";
import {HttpClient} from "aurelia-fetch-client";
import {inject, bindable} from 'aurelia-framework';
import {OperatingSystemService} from 'common/model/api/hal';
import {ElementEditor, EditorMode} from "common/lib/canvas/element";
import {InfrastructureNode} from "apps/workspaces/model/infrastructure";
import {InstanceDescriptor, NodeConfiguration} from "common/model/api/hal";

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

    imageChanged = (value: string, text:any, item:any) => {
        this.node.configuration.instanceDescriptor.key = value;
    };


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
            $(this.instanceType).dropdown({
                action: 'activate',
                onChange: this.imageChanged,
            });
            if (this.node && this.node.operatingSystem) {
                $(this.list).dropdown('set selected', this.node.operatingSystem.id);
            }
        });
    }

    activate(model: EditorMode): void {
        this.mode = model;
        this.node = model.data as InfrastructureNode;
    }
}