/**
 * Created by dustinlish on 2/19/17.
 */

import {
    autoinject,
    bindable,
    customElement
} from "aurelia-framework";
// import {HttpClient} from "aurelia-http-client";
// import {Router} from "aurelia-router";
// import {Applications} from "apps/workspaces/routes/workspace/applications/applications";
// import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";
// import {WorkspaceService} from "common/model/api/core/workspace";
import {Container} from "aurelia-dependency-injection";
import {ApplicationService} from "common/model/api/application/service";
import {SaveApplicationRequest} from "common/model/api/application/model";


@autoinject
@customElement('create-app')
export class CreateApp {

    private loading                 : boolean;

    private uploader                : HTMLElement;
    private imageElement            : HTMLInputElement;
    private application             : SaveApplicationRequest;

    @bindable
    private files: FileList;
    private appType: string = 'select'; //git, select

    // @bindable
    templates: {icon: string, description: string}[];

    constructor(
        // private client: HttpClient,
        //         private router: Router,
        //         private applications: Applications,
        //         private incompleteFeature: IncompleteFeature,
        private applicationService:ApplicationService
    ) {
        this.application = new SaveApplicationRequest();
        this.templates = [
            {icon: 'styles/themes/hasli/assets/images/blue-plus.svg', description: 'Custom Application'},
            {icon: 'styles/themes/hasli/assets/images/block.svg', description: 'Create New Container'},
            {icon: 'styles/themes/hasli/assets/images/multi-block.svg', description: 'Docker Compose'},
            {icon: 'styles/themes/hasli/assets/images/docker-swarm.svg', description: 'Docker Swarm'},
        ];

    }

    attached(): void {
        this.setupFileUpload();
    }

    switchTab(tab: string): void {
        this.appType = tab;
    }

    submit(): void {
        // this.applicationService.save(this.application).then(t => {
        //     console.log("Got one", t);
        // });






        // this.controller.validate()
        //     .then(result => {
        //         if (result.valid) {
        //             this.loading = true;
        //             let app = this.application;
        //
        //             let form = new FormData();
        //             form.append('name', app.name);
        //
        //             this.client.put(`workspaces/${this.workspaceId}/applications`, form)
        //                 .then(t => JSON.parse(t.response))
        //                 .then(t => {
        //
        //                     if (this.files && this.files.length) {
        //                         let file = new FormData();
        //                         file.append('file-data', this.files != null ? this.files[0] : "");
        //                         file.append('image-name', this.files != null ? this.files[0].name : "");
        //                         file.append('image-type', this.files != null ? this.files[0].type : "");
        //
        //                         this.client.post(
        //                             `workspaces/${this.workspaceId}/applications/${t.id}/image`, file)
        //                             .then(t => {
        //                                 this.loading = false;
        //                                 this.cancel();
        //                             });
        //                     } else {
        //                         this.loading = false;
        //                         this.cancel();
        //                     }
        //                 })
        //         }
        //     });
    }

    cancel(): void {
        // this.applications.close();
    }


    activate(id: any) {
    }

    setupFileUpload(): void {
        let $form = $(this.uploader),
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
            //$form.addClass('has-advanced-upload');

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
                    this.files = (e.originalEvent as DragEvent).dataTransfer.files;
                    showFiles(this.files);
                    console.log(this.files && this.files.length > 0)
                });
        }

        $input.on('change', function (e) {
            showFiles((e as any).target.files);
            console.log(this.files[0].type.name)
        });
    }

}

