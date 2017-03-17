import {bindable} from "aurelia-framework";

export class Clouds {

    @bindable
    clouds: Cloud[];


    @bindable
    loading: boolean;


    attached(): void {
        this.clouds = [''];
    };

    refresh(): void {
        this.loading = true;
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
