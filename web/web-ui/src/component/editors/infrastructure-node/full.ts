import {inject, bindable} from 'aurelia-framework';
import {OperatingSystemService} from 'model/os';

import {
    ElementEditor
} from "canvas/element/element";

import {UUID} from "utils/uuid";
import {
    InfrastructureNode
} from "component/model/infrastructure-node";


@inject(OperatingSystemService)
export class FullInfrastructureNodeEditor implements ElementEditor<InfrastructureNode> {


    list:HTMLElement;

    @bindable
    private node:InfrastructureNode;


    constructor(
        private osService:OperatingSystemService
    ) {



    }

    open(node: InfrastructureNode): void {
        this.node = node;

    }

    osChanged = (value: string, text:any, item:any) => {
        this.node.setOperatingSystem(this.osService.get(UUID.fromString(value)));
    };

    attached() : void {
        setTimeout(() => {
            $(this.list).dropdown({
                action: 'activate',
                onChange: this.osChanged,
            });
            $(this.list).dropdown('set selected', this.node.operatingSystem.id);
        });
    }

    activate(model:any) : void {
    }


}
