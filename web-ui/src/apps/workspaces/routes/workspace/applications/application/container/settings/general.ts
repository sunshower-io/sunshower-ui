import {autoinject, bindable} from "aurelia-framework";
import {Router} from "aurelia-router";
import {HttpClient} from "aurelia-fetch-client";
import {Provider} from "common/model/api/hal/api";
/**
 * Created by dustinlish on 2/21/17.
 */

@autoinject
export class General {

    @bindable
    providers: Provider[];

    @bindable
    loading: boolean;


    constructor(
        private router:Router,
        private client:HttpClient
    ) {

    }


    attached(): void {
        this.refresh();
    };

    activate(id:any)  {
        this.refresh();
    }


    deploy(id: string) {
        this.router.navigateToRoute('output', {id:id});
    }

    refresh(): void {
        this.loading = true;
        this.client.fetch('providers')
            .then(r => r.json() as any)
            .then(r => {
                this.providers = r;
                this.loading = false;
            });
    }

}