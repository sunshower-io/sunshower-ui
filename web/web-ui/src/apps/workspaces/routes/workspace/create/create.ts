import {inject, bindable, NewInstance} from 'aurelia-framework';
import {Workspace} from "apps/workspaces/routes/workspace/index";
import {HttpClient} from "aurelia-http-client";
import {
    ValidationController,
    ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from 'common/resources/custom-components/bootstrap-form-renderer';
import {UUID} from "common/lib/utils/uuid";

@inject(Workspace, HttpClient, NewInstance.of(ValidationController))
export class Create {

    private uploader: HTMLElement;

    private name:string;
    private loading:boolean;
    private description:string;
    private imageElement:HTMLInputElement;

    @bindable
    private files: FileList;


    constructor(private parent: Workspace, private client: HttpClient, private controller:ValidationController) {
        this.controller.addRenderer(new BootstrapFormRenderer());
    }

    attached() : void {
        this.setupFileUpload();
        ValidationRules
            .ensure((wsp:Create) => wsp.name).required()
            .ensure((wsp:Create) => wsp.description).required()
            .ensure((wsp:Create) => wsp.files).displayName('Image').required()
            .on(Create);
    }

    activate(): void {
        this.parent.setMenuVisible(false);
    }


    create(): void {
        this.controller.validate().then(result => {
            if (result.valid) {
                this.loading = true;
                let form = new FormData();
                let fd = form as any;

                form.append('name', this.name);
                fd.append('image', this.files[0]);
                form.append('image-name', this.files[0].name);
                form.append('description', this.description);
                form.append('image-type', this.files[0].type);
                this.client.post('workspaces/save', form)
                    .then(t => {
                        // console.log(t);
                        this.loading = false;
                        this.parent.router.navigate('/');
                        //todo redirect to this workspace?
                    });
            }
        });
    }

    cancel() : void {
        this.parent.router.navigate('/')
    }

    onchange(): void {
        console.log(this.files);
    }

    setupFileUpload() : void {
        let $form = $(this.uploader),
            $input    = $form.find('input[type="file"]'),
            $label    = $form.find('.upload-box__file-label'),
            showFiles = function(files) {
                $label.text(files[0].name);
            },
            isAdvancedUpload = function() {
                let div = document.createElement('div');
                return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
            }();
        if (isAdvancedUpload) {
            //$form.addClass('has-advanced-upload');

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
                    this.files = (e.originalEvent as DragEvent).dataTransfer.files;
                    showFiles( this.files );
                    console.log(this.files && this.files.length > 0)
                });
        }

        $input.on('change', function(e) {
            showFiles((e as any).target.files);
            console.log(this.files[0].type.name)
        });
    }


}