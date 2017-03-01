/**
 * Created by dustinlish on 2/19/17.
 */

import {autoinject} from "aurelia-framework";
import {customElement} from "aurelia-framework";
import {bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

import {WorkspaceRevision} from "apps/workspaces/model/workspaces/workspace";
import {Applications} from "apps/workspaces/routes/workspace/applications/applications";
import {Workspace} from "apps/workspaces/routes/workspace/index";


@autoinject
@customElement('create-app')
export class CreateApp {

    private file            : File;
    private image           : File;
    private name            : string;
    private loadingA         : boolean = false;

    @bindable
    templates               : Template[];

    @bindable
    private workspace       : WorkspaceRevision;

    private fileInput       : HTMLInputElement;
    private imageInput      : HTMLInputElement;

    constructor(
        private workspaceVm:Workspace,
        private parent:Applications,
        private client:HttpClient
    ) {
        this.templates = [
            new Template('styles/themes/hasli/assets/images/blue-plus.svg', 'Custom Application'),
            new Template('styles/themes/hasli/assets/images/block.svg', 'Create New Container'),
            new Template('styles/themes/hasli/assets/images/multi-block.svg', 'Docker Compose'),
            new Template('styles/themes/hasli/assets/images/docker-swarm.svg', 'Docker Swarm'),
            // new Template('styles/themes/hasli/assets/images/multi-tier-webapp.svg', '3 Tier Web App'),
            // new Template('styles/themes/hasli/assets/images/cd-build-environment.svg', 'CD Build Environment'),
            // new Template('styles/themes/hasli/assets/images/ms-architecture.svg', 'Microservices Architecture'),
            // new Template('styles/themes/hasli/assets/images/java-ee.svg', 'Java EE Enterprise'),
        ]

    }

    activate() {

    }

    attached() : void {
        $(this.fileInput).on('change', () => {
            this.file = this.fileInput.files[0];
        }) ;


        $(this.imageInput).on('change', () => {
            this.image = this.imageInput.files[0];
        }) ;
    }


    create() : void {
        let request = new FormData(),
            workspace = this.workspaceVm.workspace,
            client = this.client as any;


        request.append('name', this.name);
        request.append('description', 'sample app');
        request.append('image', this.image);
        request.append('repository', this.file);
        request.append('image-name', this.image.name);
        client.createRequest(`workspaces/${workspace.workspace.id}`)
            .asPost()
            .withProgressCallback(c => {

            })
            .withContent(request)
            .send()
            .then(t => {
                this.loadingA = false;
                this.parent.parent.router.navigate("applications/4/application")
            });






    }

    cancel() : void {
        this.parent.showModal = false;
    }

    click() : void {
        $('#btn-test').on("hover", function() {
            $('#Shape').css({fill: "#ff0000"})
        })
    }

}

export class Template {
    icon        ?: string;
    description ?: string;

    constructor(icon, desc) {
        this.icon = icon;
        this.description = desc;
    }
}