import {bindable} from "aurelia-framework";
import {AddCloud} from "./add-cloud";

export class Clouds {

    @bindable
    clouds: Cloud[];

    @bindable
    loading: boolean;

    private addCloudOverlay: AddCloud;


    attached(): void {
        this.clouds = [];
    };

    refresh(): void {
        this.loading = true;
    }

    addCloud() : void {
        this.addCloudOverlay.open();
    }

}

//leaving this here so Josiah can put it wherever
export class Cloud {
    logo    ?: string;
    name    ?: string;
    status  ?: string;
    ip      ?: string;
    ports   ?: string;
    cpu     ?: number;
    memory  ?: number;
    disk    ?: number;
}
