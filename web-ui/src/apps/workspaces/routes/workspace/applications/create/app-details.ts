/**
 * Created by dustinlish on 2/19/17.
 */

import {
    inject,
    bindable,
    customElement,
    NewInstance
} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client"; //will this actually work with image upload now?
import {Application} from "common/model/api/sdk";
import {Router} from "aurelia-router";
import {Applications} from "apps/workspaces/routes/workspace/applications/applications";
import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";
import {
    ValidationController,
    ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from 'common/resources/custom-components/bootstrap-form-renderer';


@inject(HttpClient, Router, Applications, IncompleteFeature, NewInstance.of(ValidationController))
@customElement('create-app')
export class CreateApp {

    private loading         : boolean;

    private workspaceId     : string;
    private application     : Application;

    private appType         : string = 'select'; //git, select

    // @bindable
    // templates: {icon: string, description: string}[];

    constructor(
        private client:HttpClient,
        private router:Router,
        private applications:Applications,
        private incompleteFeature: IncompleteFeature,
        private controller: ValidationController
    ) {
        this.controller.addRenderer(new BootstrapFormRenderer());
        this.application = new Application();

        // this.templates = [
        //     {icon: 'styles/themes/hasli/assets/images/blue-plus.svg', description: 'Custom Application'},
        //     {icon: 'styles/themes/hasli/assets/images/block.svg', description: 'Create New Container'},
        //     {icon: 'styles/themes/hasli/assets/images/multi-block.svg', description: 'Docker Compose'},
        //     {icon: 'styles/themes/hasli/assets/images/docker-swarm.svg', description: 'Docker Swarm'},
        //     {icon: 'styles/themes/hasli/assets/images/multi-tier-webapp.svg', description: '3 Tier Web App'},
        //     {icon: 'styles/themes/hasli/assets/images/cd-build-environment.svg', description: 'CD Build Environment'},
        //     {icon: 'styles/themes/hasli/assets/images/ms-architecture.svg', description: 'Microservices Architecture'},
        //     {icon: 'styles/themes/hasli/assets/images/java-ee.svg', description: 'Java EE Enterprise'},
        // ]
    }


    switchTab(tab: string) : void {
        this.appType = tab;
    }

    submit() : void {
        this.controller.validate()
            .then(result => {
                if (result.valid) {
                    this.loading = true;
                    let app = this.application;
                    if (app && app.repository && app.repository.remote && app.repository.remote.location) {
                        if (app.repository.remote.credential.credential == '' && app.repository.remote.credential.secret == '') {
                            app.repository.remote.credential = null;
                        }
                    }
                    this.client.fetch(`workspaces/${this.workspaceId}/applications`, {
                        method: 'put',
                        body: JSON.stringify(app)
                    }).then(t => t.json() as any).then(t => {
                        this.loading = false;
                        this.cancel();
                    })
                }
            });
    }

    cancel() : void {
        this.applications.close();
    }

    setupValidation() : void {
        let appRules = ValidationRules
            .ensure((app: Application) => app.name).required()
            .rules;

        //todo require credential if secret is provided & vice versa
        this.controller.addObject(this.application, appRules);
        console.log(appRules);
    }

    activate(id: any) {
        this.workspaceId = id;
        this.application = new Application();

        this.setupValidation();

    }

}

