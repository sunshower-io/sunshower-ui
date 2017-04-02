import {autoinject, bindable} from 'aurelia-framework';
import {Workspace} from "apps/workspaces/routes/workspace/index";
import {
    SaveWorkspaceRequest
} from "common/model/api/workspace/model";

import {
    WorkspaceService
} from "common/model/api/workspace/service";

import {ConstraintViolationException} from "common/model/service/service";
import {Router} from "aurelia-router";


@autoinject
export class Create {


    private loading: boolean;
    private uploader: HTMLElement;
    private imageElement: HTMLInputElement;
    private workspaceRequest: SaveWorkspaceRequest;
    private constraintViolations: ConstraintViolationException;

    @bindable
    private files: FileList;


    constructor(private parent: Workspace,
                private router: Router,
                private workspaceService: WorkspaceService
    ) {
    }

    attached(): void {
        this.setupFileUpload();
    }

    activate(): void {
        this.parent.setMenuVisible(false);
        this.workspaceRequest = new SaveWorkspaceRequest();
    }


    create(): void {
        this.workspaceRequest.bindFiles(this.files);
        this.workspaceService.save(this.workspaceRequest)
            .catch(err => {
                this.constraintViolations = err;
            })
            .then(result => {
                if(result) {
                    this.router.navigate(`/workspace/${result.id}/applications`)
                }
            });
    }

    cancel(): void {
        this.parent.router.navigate('/')
    }

    onchange(): void {
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