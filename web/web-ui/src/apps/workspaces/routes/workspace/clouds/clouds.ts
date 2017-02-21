import {bindable} from "aurelia-framework";
import {Provider} from "common/model/api/hal/api";
import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

import {Workspace} from "apps/workspaces/routes/workspace/index";
@autoinject
export class Clouds {

    @bindable
    providers: Provider[];

    @bindable
    loading: boolean;


    constructor(private parent:Workspace, private client:HttpClient) {
    }

    attached(): void {
        this.refresh();
    };

    activate(id:any)  {
        this.parent.setMenuVisible(true);
        this.refresh();
    }


    refresh(): void {
        this.loading = true;
        this.client.fetch('provider')
            .then(r => r.json() as any)
            .then(r => {
                this.providers = r;
                this.loading = false;
            });
    }

    configure(id: string) : void {
        this.parent.router.navigate(`clouds/${id}/credential/new`);
    }

    addCloud() : void {
        this.parent.router.navigate('clouds/new');
    }

}

