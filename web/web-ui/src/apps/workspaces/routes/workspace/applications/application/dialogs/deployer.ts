import {DialogController} from "aurelia-dialog";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {ApplicationRevision, ApplicationRevisionDeployer} from "apps/workspaces/model/application";

@inject(
    DialogController,
    HttpClient
)

export class DeployerDialog {

    private loading                 : boolean;

    private applicationRevision     : ApplicationRevision;
    private deployers               : ApplicationRevisionDeployer[];


    constructor(
        private controller:DialogController,
        private client:HttpClient
    ) {
        this.deployers = [];

    }

    activate(applicationRevision : ApplicationRevision) : void {
        setTimeout(() => {
            this.applicationRevision = applicationRevision;

            this.loading = true;

            let hfs = new ApplicationRevisionDeployer(),
                docker = new ApplicationRevisionDeployer();
            hfs.name = 'HFS';
            hfs.icon = 'styles/themes/hasli/assets/images/logos/hasli-icon.svg';
            docker.name = 'Docker';
            docker.icon = 'styles/themes/hasli/assets/images/logos/docker-icon.svg';
            this.deployers.push(hfs);
            this.deployers.push(docker);

            this.loading = false;

        }, 1000);
    }

    save(deployer : ApplicationRevisionDeployer) : void {
        this.applicationRevision.requirements.push(deployer);
        //todo save applicationRevision
        this.controller.ok(this.applicationRevision);
    }

}