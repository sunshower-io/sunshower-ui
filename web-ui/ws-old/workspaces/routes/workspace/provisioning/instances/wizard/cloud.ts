import {bindable, autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {Provider} from "common/model/api/hal/api";

@autoinject
export class ConfigureCloud {


    private loading:boolean;

    @bindable
    providers: Provider[];
    constructor(private client:HttpClient) {

    }

    attached()  : void {
        this.refresh();
    }
    refresh(): void {
        this.loading = true;

        setTimeout(() => {
            this.client.fetch('providers')
                .then(r => r.json() as any)
                .then(r => {
                    // TODO change back after testing
                    this.providers = r.map(r => {
                        r.icon = "styles/themes/hasli/assets/images/logos/aws-logo-2.svg";
                        r.name = "Provider";
                        return r;
                    });
                    // this.providers = this.createMockProviders();
                    this.loading = false;
                })
                .catch(err => {
                    this.loading = false;
                });
        }, 500)
    }
}