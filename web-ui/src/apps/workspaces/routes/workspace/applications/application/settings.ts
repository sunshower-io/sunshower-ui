import {bindable, autoinject} from "aurelia-framework";
import {Application} from "common/model/api/application/model";
import {RemoteService, Remote} from "common/model/api/revision/revisions";
import {ApplicationService} from "common/model/api/application/service";
import {Router} from "aurelia-router";

@autoinject
export class Settings {


    private remote          : Remote;
    private workspaceId     : string;

    @bindable
    private application     : Application;
    private loading         : boolean;

    @bindable
    private message:any;
    constructor(
        private router: Router,
        private applicationService:ApplicationService
    ) {

    }

    saveRepository() : void {
        this.loading = true;
        this.applicationService.saveRemote(this.remote)
            .then(t => {
                this.router.navigateToRoute('Summary');
                this.loading = false
            });
    }

}