import {DialogController} from "aurelia-dialog";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {
    ComputeTemplate,
    ComputeTemplateMarshaller
} from "common/model/api/hal/compute";
import {OperatingSystemService} from "common/model/api/hal/os";
import {UUID} from "common/lib/utils/uuid";
import {CredentialSecret} from "common/model/security/credentials";
import {ApplicationRevision} from "apps/workspaces/model/application";


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
    private applicationRevision     : ApplicationRevision;

    constructor(
        private controller:DialogController,
        private client:HttpClient,
        private osService:OperatingSystemService
    ) {
        this.template = {} as ComputeTemplate;
        this.marshaller = new ComputeTemplateMarshaller();
    }

    activate(applicationRevision : ApplicationRevision) : void {
        setTimeout(() => {
            this.applicationRevision = applicationRevision;
            $(this.list).dropdown({
                action: 'activate',
                onChange: this.osChanged,
            });
            //todo get credentials
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
        if (typeof this.template != 'undefined') {
            this.applicationRevision.requirements.push(this.template);
        }
        if (typeof this.credential != 'undefined') {
            this.applicationRevision.requirements.push(this.credential);
        }
        this.controller.ok(this.applicationRevision);
    }

}