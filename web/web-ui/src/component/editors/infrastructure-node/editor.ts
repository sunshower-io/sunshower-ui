import {inject, bindable} from 'aurelia-framework';
import {OperatingSystemService} from 'model/os';

import {ElementEditor} from "canvas/element/element";

import {InfrastructureNode} from "component/model/infrastructure-node";


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

    attached() : void {
        setTimeout(() => {
            $(this.list).dropdown({
                action: 'activate'
            });
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
