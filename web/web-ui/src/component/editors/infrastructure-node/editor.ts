import {inject, bindable} from 'aurelia-framework';
import {OperatingSystemService} from 'model/os';

import {ElementEditor} from "canvas/element/element";

import {InfrastructureNode} from "component/model/infrastructure-node";
import {UUID} from "utils/uuid";


@inject(OperatingSystemService)
export class InfrastructureNodeEditor implements ElementEditor<InfrastructureNode> {


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
        // console.log("beans");
        //
        // $(this.list).dropdown({
        //     action: 'activate'
        // });
    }


}
