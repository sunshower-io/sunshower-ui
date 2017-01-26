import {inject, bindable} from 'aurelia-framework';
import {InfrastructureNode} from "component/model/infrastructure-node";
import {ElementEditor, EditorMode} from "canvas/element/element";
import {OperatingSystemService} from 'model/os';
import {UUID} from "utils/uuid";

@inject(OperatingSystemService)
export class BasicInfrastructureNodeEditor implements
    ElementEditor<InfrastructureNode> {

    @bindable
    mode:EditorMode;

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
            if (this.node && this.node.operatingSystem) {
                $(this.list).dropdown('set selected', this.node.operatingSystem.id);
            }
        });
    }

    activate(model:EditorMode) : void {
        this.mode = model;
    }
}