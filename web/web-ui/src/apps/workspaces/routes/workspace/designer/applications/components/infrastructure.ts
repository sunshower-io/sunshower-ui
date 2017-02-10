import {OperatingSystem} from "model/hal/api";

import {OperatingSystemService} from "model/os";

import {inject, bindable, bindingMode} from 'aurelia-framework';

@inject(
    OperatingSystemService
)
export class Infrastructure {


    @bindable
    public operatingSystem:OperatingSystem;

    private osSelect:HTMLElement;

    private operatingSystems: OperatingSystem[];

    constructor(
        private osService:OperatingSystemService) {
        this.operatingSystems = osService.list();
    }

    attached() : void {
    }

    activate(data:any) {
        // this.task = data;
        // this.operatingSystem = new OperatingSystem();
        // if(this.task && !this.task.deploymentTarget) {
        //     let id = new InfrastructureDescriptor();
        //     id.operatingSystem = this.operatingSystem;
        //     this.task.deploymentTarget = id;
        // }

    }


}