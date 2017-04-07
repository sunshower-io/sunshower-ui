import {DialogController} from "aurelia-dialog";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {ApplicationTemplate} from "common/model/api/application/model"

@inject(
    DialogController,
    HttpClient
)

export class DeployerDialog {

    private loading                 : boolean;

    private applicationRevision     : ApplicationTemplate;
    // private deployers               : ApplicationTemplateDeployer[];


    constructor(
        private controller:DialogController,
        private client:HttpClient
    ) {
        // this.deployers = [];

    }

    activate(applicationRevision : ApplicationTemplate) : void {
        setTimeout(() => {
            this.applicationRevision = applicationRevision;

            this.loading = true;

            // let hfs = new ApplicationTemplateDeployer(),
            //     docker = new ApplicationTemplateDeployer();
            // hfs.name = 'HFS';
            // hfs.icon = 'styles/themes/hasli/assets/images/logos/hasli-icon.svg';
            // docker.name = 'Docker';
            // docker.icon = 'styles/themes/hasli/assets/images/logos/docker-icon.svg';
            // this.deployers.push(hfs);
            // this.deployers.push(docker);

            this.loading = false;

        }, 1000);
    }

    // save(deployer : ApplicationTemplateDeployer) : void {
    //     this.applicationRevision.requirements.push(deployer);
    //     //todo save applicationRevision
    //     this.controller.ok(this.applicationRevision);
    // }

}