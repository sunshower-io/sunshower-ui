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
import {ApplicationContext} from "apps/workspaces/model/application-context";


@inject(
    Workspace,
    Applications,
    HttpClient,
    ApplicationContext,
    NewInstance.of(ValidationController)
)
@customElement('create-app')
export class CreateApp {

    private file: File;
    private image: File;
    private name: string;

    @bindable
    private loading: boolean = false;

    @bindable
    private appType: boolean = false;

    @bindable
    templates: Template[];

    template: Template;

    @bindable
    private workspace: WorkspaceRevision;

    private fileInput: HTMLInputElement;
    private imageInput: HTMLInputElement;

    private imageUploader: HTMLElement;
    private fileUploader: HTMLElement;

    constructor(private workspaceVm: Workspace,
                private parent: Applications,
                private client: HttpClient,
                private context:ApplicationContext,
                private controller: ValidationController
    ) {
        this.templates = [
            new Template('styles/themes/hasli/assets/images/blue-plus.svg', 'Custom Application'),
            new Template('styles/themes/hasli/assets/images/block.svg', 'Create New Container'),
            new Template('styles/themes/hasli/assets/images/multi-block.svg', 'Docker Compose'),
            new Template('styles/themes/hasli/assets/images/docker-swarm.svg', 'Docker Swarm'),
            new Template('styles/themes/hasli/assets/images/multi-tier-webapp.svg', '3 Tier Web App'),
            new Template('styles/themes/hasli/assets/images/cd-build-environment.svg', 'CD Build Environment'),
            new Template('styles/themes/hasli/assets/images/ms-architecture.svg', 'Microservices Architecture'),
            new Template('styles/themes/hasli/assets/images/java-ee.svg', 'Java EE Enterprise'),
            new Template('styles/themes/hasli/assets/images/github-mark.svg', 'Github Integration')
        ]
        this.controller.addRenderer(new BootstrapFormRenderer());
    }

    activate() {
    }

    attached(): void {
        this.setupImageUpload();
        this.setupFileUpload();
        ValidationRules
            .ensure((app: CreateApp) => app.name).required()
            .ensure((app: CreateApp) => app.image).required()
            .ensure((app: CreateApp) => app.file).displayName('Application upload').required()
            .on(CreateApp);
        //todo set up better rule to require either file OR template
    }


    create(): void {
        this.loading = true;
        this.controller.validate().then(result => {
            if (result.valid) {
                let request = new FormData(),
                    workspace = this.workspaceVm.workspace,
                    client = this.client as any,
                    image = this.image[0],
                    file = this.file[0];

                request.append('name', this.name);
                request.append('description', 'sample app');
                request.append('image', image);
                request.append('repository', file);
                request.append('image-name', image.name);
                client.createRequest(`workspaces/${this.context.workspace.id}`)
                    .asPost()
                    .withProgressCallback(c => {

                    })
                    .withContent(request)
                    .send()
                    .then(t => JSON.parse(t.response))
                    .then(t => {
                        this.loading = false;
                        this.parent.parent.router.navigate(`applications/${t.application.id}/application`)

                    });
            }
            else {
                this.loading = false;
            }
        });

    }

    cancel(): void {
        this.controller.reset();
        this.parent.showModal = false;
    }

    switchTab(tab: boolean): void {
        this.appType = tab;
    }

    //todo refactor uploads
    //todo fix label changer
    setupImageUpload(): void {
        let $form = $(this.imageUploader),
            $input    = $form.find('input[type="file"]'),
            $label    = $form.find('.upload-box__file-label'),
            showFiles = function(files) {
                $label.text(files[0].name);
            },
            isAdvancedUpload = function () {
                let div = document.createElement('div');
                return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
            }();
        if (isAdvancedUpload) {
            $form.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
                e.preventDefault();
                e.stopPropagation();
            })
                .on('dragover dragenter', function () {
                    $form.addClass('is-dragover');
                })
                .on('dragleave dragend drop', function () {
                    $form.removeClass('is-dragover');
                })
                .on('drop', (e) => {
                    this.image = (e.originalEvent as DragEvent).dataTransfer.files[0];
                    showFiles(this.image);
                });
        }
        $input.on('change', function (e) {
            showFiles((e as any).target.files);
        });
    }

    setupFileUpload(): void {
        let $form = $(this.fileUploader),
            $input = $form.find('input[type="file"]'),
            $label = $form.find('.upload-box__file-label'),
            showFiles = function (files) {
                $label.text(files[0].name);
            },
            isAdvancedUpload = function () {
                let div = document.createElement('div');
                return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
            }();
        if (isAdvancedUpload) {
            $form.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
                e.preventDefault();
                e.stopPropagation();
            })
                .on('dragover dragenter', function () {
                    $form.addClass('is-dragover');
                })
                .on('dragleave dragend drop', function () {
                    $form.removeClass('is-dragover');
                })
                .on('drop', (e) => {
                    this.file = (e.originalEvent as DragEvent).dataTransfer.files[0];
                    showFiles(this.file);
                });
        }
        $input.on('change', function (e) {
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