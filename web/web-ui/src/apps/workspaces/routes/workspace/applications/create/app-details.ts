/**
 * Created by dustinlish on 2/19/17.
 */

import {inject, bindable, NewInstance, customElement} from "aurelia-framework";
import {
    ValidationController,
    ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from 'common/resources/custom-components/bootstrap-form-renderer';
import {HttpClient} from "aurelia-http-client";

import {WorkspaceRevision} from "apps/workspaces/model/workspaces/workspace";
import {Applications} from "apps/workspaces/routes/workspace/applications/applications";
import {Workspace} from "apps/workspaces/routes/workspace/index";


@inject(Workspace, Applications, HttpClient, NewInstance.of(ValidationController))
@customElement('create-app')
export class CreateApp {

    private file            : File;
    private image           : File;
    private name            : string;
    private loadingA         : boolean = false;

    @bindable
    private appType : boolean = false;

    @bindable
    templates               : Template[];

    template                : Template;

    @bindable
    private workspace       : WorkspaceRevision;

    private fileInput       : HTMLInputElement;
    private imageInput      : HTMLInputElement;

    private imageUploader   : HTMLElement;
    private fileUploader    : HTMLElement;

    constructor(
        private workspaceVm:Workspace,
        private parent:Applications,
        private client:HttpClient,
        private controller:ValidationController
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
        this.controller.addRenderer(new BootstrapFormRenderer());
    }

    activate() {
    }

    attached() : void {
        this.setupImageUpload();
        this.setupFileUpload();
        ValidationRules
            .ensure((app:CreateApp) => app.name).required()
            .ensure((app:CreateApp) => app.image).required()
            .ensure((app:CreateApp) => app.file).displayName('Application upload').required()
            .on(CreateApp);
        //todo set up better rule to require either file OR template
    }


    create() : void {
        this.controller.validate().then(result => {
            if (result.valid) {
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
        });

    }

    cancel() : void {
        this.controller.reset();
        this.parent.showModal = false;
    }

    click() : void {
        $('#btn-test').on("hover", function() {
            $('#Shape').css({fill: "#ff0000"})
        })
    }

    switchTab(tab:boolean) : void {
        this.appType = tab;
    }

    //todo refactor uploads
    setupImageUpload() : void {
        let $form = $(this.imageUploader),
            $input    = $form.find('input[type="file"]'),
            $label    = $form.find('.upload-box__file-label'),
            showFiles = function(file) {
                $label.text(file.name);
            },
            isAdvancedUpload = function() {
                let div = document.createElement('div');
                return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
            }();
        if (isAdvancedUpload) {
            $form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                })
                .on('dragover dragenter', function() {
                    $form.addClass('is-dragover');
                })
                .on('dragleave dragend drop', function() {
                    $form.removeClass('is-dragover');
                })
                .on('drop', (e) => {
                    this.image = (e.originalEvent as DragEvent).dataTransfer.files[0];
                    showFiles( this.image );
                });
        }
        $input.on('change', function(e) {
            showFiles((e as any).target.files);
        });
    }

    setupFileUpload() : void {
        let $form = $(this.fileUploader),
            $input    = $form.find('input[type="file"]'),
            $label    = $form.find('.upload-box__file-label'),
            showFiles = function(file) {
                $label.text(file.name);
            },
            isAdvancedUpload = function() {
                let div = document.createElement('div');
                return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
            }();
        if (isAdvancedUpload) {
            $form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                })
                .on('dragover dragenter', function() {
                    $form.addClass('is-dragover');
                })
                .on('dragleave dragend drop', function() {
                    $form.removeClass('is-dragover');
                })
                .on('drop', (e) => {
                    this.file = (e.originalEvent as DragEvent).dataTransfer.files[0];
                    showFiles( this.file );
                });
        }
        $input.on('change', function(e) {
            showFiles((e as any).target.files);
        });
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