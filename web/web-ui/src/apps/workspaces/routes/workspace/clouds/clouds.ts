import {bindable} from "aurelia-framework";
import {AddCloud} from "./add-cloud";
import {Provider} from "common/model/api/hal/api";
import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {AddCredential} from "./add-credential";

@autoinject
export class Clouds {

    @bindable
    providers: Provider[];

    @bindable
    loading: boolean;

    private addCloudOverlay: AddCloud;
    private addCredentialOverlay: AddCredential;


    constructor(private client:HttpClient) {
    }

    attached(): void {
        this.refresh();
    };

    activate(id:any)  {
        this.refresh();
    }

    refresh(): void {
        this.loading = true;
        this.client.fetch('provider')
            .then(r => r.json() as any)
            .then(r => {
                this.providers = r;
                this.loading = false;

                // let aws = new Provider;
                // aws.name = "AWS";
                // aws.key = 'aws';
                // this.providers.push(aws)
            });
    }

    configure(id: string) : void {
        let provider = this.providers.find(t => t.id == id);
        this.addCredentialOverlay.open(provider);

    }

    addCloud() : void {
        this.addCloudOverlay.open();
    }

}

