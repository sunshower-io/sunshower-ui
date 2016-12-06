import {OperatingSystemService, OperatingSystem} from "model/os";

import {UUID} from "utils/uuid";
import {Task, TaskManager} from "task/tasks";
import {inject, bindable, bindingMode} from 'aurelia-framework';
import {InfrastructureDescriptor} from "task/infrastructure";

@inject(
    OperatingSystemService,
    TaskManager
)
export class Infrastructure {


    @bindable
    public task:Task;

    @bindable
    public operatingSystem:OperatingSystem;

    private osSelect:HTMLElement;

    private operatingSystems: OperatingSystem[];

    constructor(
        private osService:OperatingSystemService,
        private taskManager:TaskManager
    ) {
        this.operatingSystems = osService.list();
    }

    attached() : void {

        $(this.osSelect).dropdown({
            onChange : (value, text, selectedItem) => {
                this.task.deploymentTarget.operatingSystem =
                    this.osService.get(UUID.fromString(value));
            }
        })
    }

    activate(data:Task) {
        this.task = data;
        this.operatingSystem = new OperatingSystem();
        if(this.task && !this.task.deploymentTarget) {
            let id = new InfrastructureDescriptor();
            id.operatingSystem = this.operatingSystem;
            this.task.deploymentTarget = id;
        }

    }


}