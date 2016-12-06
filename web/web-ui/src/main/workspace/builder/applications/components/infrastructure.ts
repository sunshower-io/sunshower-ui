import {OperatingSystemService, OperatingSystem} from "model/os";

import {inject} from 'aurelia-framework';

@inject(OperatingSystemService)
export class Infrastructure {

    private operatingSystems: OperatingSystem[];

    constructor(private osService:OperatingSystemService) {
        this.operatingSystems = osService.list();

    }
}