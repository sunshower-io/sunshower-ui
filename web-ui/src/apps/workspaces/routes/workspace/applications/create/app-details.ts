/**
 * Created by dustinlish on 2/19/17.
 */

import {
    autoinject,
    bindable,
    customElement
} from "aurelia-framework";
import {ApplicationService} from "common/model/api/application/service";
import {SaveApplicationRequest} from "common/model/api/application/model";
import {Applications} from "apps/workspaces/routes/workspace/applications/applications";


@autoinject
@customElement('create-app')
export class CreateApp {

    private loading                 : boolean;

    private uploader                : HTMLElement;
    private imageElement            : HTMLInputElement;
    private application             : SaveApplicationRequest;

    // @bindable
    private files           : FileList;
    private appType         : string = 'select'; //git, select

    // @bindable
    templates: {icon: string, description: string}[];

    constructor(
        private applications            : Applications,
        private applicationService      : ApplicationService
    ) {
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
        this.application.bindFiles(this.files);
        this.applicationService.save(this.application).then(t => {
            this.applications.close();

        });
    }

    cancel(): void {
        this.applications.close();
    }


    activate(id: any) {
        this.application = new SaveApplicationRequest();
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
        });
    }

}

