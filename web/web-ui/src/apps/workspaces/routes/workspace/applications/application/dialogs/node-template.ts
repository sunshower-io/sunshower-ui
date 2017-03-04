import {DialogController} from "aurelia-dialog";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {
    ComputeTemplate,
    ComputeTemplateMarshaller
} from "common/model/api/hal/compute";
import {OperatingSystemService} from "common/model/api/hal/os";
import {UUID} from "../../../../../../../common/lib/utils/uuid";
import {CredentialSecret} from "../../../../../../../common/model/security/credentials";


@inject(
    DialogController,
    HttpClient,
    OperatingSystemService
)
export class NodeTemplateDialog {


    private selectingTemplate       : boolean;
    private selectingCredential     : boolean;
    private loading                 : boolean;
    private list                    : HTMLElement;
    private template                : ComputeTemplate;
    private templates               : ComputeTemplate[];
    private marshaller              : ComputeTemplateMarshaller;
    private credential              : CredentialSecret;
    private credentials             : CredentialSecret[];

    constructor(
        private controller:DialogController,
        private client:HttpClient,
        private osService:OperatingSystemService
    ) {

        this.template = {} as ComputeTemplate;
        this.marshaller = new ComputeTemplateMarshaller();
    }

    activate() : void {
        setTimeout(() => {
            $(this.list).dropdown({
                action: 'activate',
                onChange: this.osChanged,
            });
        }, 1000);
    }

    osChanged = (value: string, text: any, item: any) => {
        this.template.operatingSystem = this.osService.get(UUID.fromString(value));
    };


    toggleTemplate(state : boolean) : void {
        this.selectingTemplate = state;
        if (this.selectingTemplate) {
            this.loading = true;
            this.client.fetch('compute')
                .then(t => t.json() as any)
                .then(t => {
                    this.templates = t;
                    this.loading = false;
                    console.log("GOT", t[0]);
                });
        };
    }

    saveNodeTemplate() : void {
        this.loading = true;
        this.client.fetch('compute/index', {
            method: 'put',
            body: JSON.stringify(this.marshaller.write(this.template))
        }).then(t => {
            this.loading = false;
            this.selectNodeTemplate(t);
        });
    }

    selectNodeTemplate(template: any) : void {
        this.template = template;
        this.selectingCredential = true;
    }

    save() : void {
        //todo wire credential, node template and application together


        this.controller.ok();
    }

}