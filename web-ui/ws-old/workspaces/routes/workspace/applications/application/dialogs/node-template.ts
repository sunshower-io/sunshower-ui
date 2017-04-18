import {DialogController} from "aurelia-dialog";
import {inject, bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {
    ComputeTemplate,
    ComputeTemplateMarshaller
} from "common/model/api/hal/compute";
import {OperatingSystemService} from "common/model/api/hal/os";
import {OperatingSystem, AWSRegion} from "common/model/api/hal/api";
import {UUID} from "common/lib/utils/uuid";
import {Credential} from "common/model/security/credentials";
// import {ApplicationTemplate} from "apps/workspaces/model/application";
import {ApplicationTemplate} from "common/model/api/application/model"


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
    private locationList            : HTMLElement;
    private template                : ComputeTemplate;
    private templates               : ComputeTemplate[];
    private marshaller              : ComputeTemplateMarshaller;
    private credential              : Credential;
    private credentials             : Credential[];
    private applicationRevision     : ApplicationTemplate;
    private operatingSystems        : OperatingSystem[];
    private locations               : AWSRegion[];

    //wire together?
    @bindable
    private os_id                   : string;
    @bindable
    private location_id             : string;

    constructor(
        private controller:DialogController,
        private client:HttpClient,
        private osService:OperatingSystemService
    ) {
        this.template = {} as ComputeTemplate;
        this.marshaller = new ComputeTemplateMarshaller();
    }

    activate(applicationRevision : ApplicationTemplate) : void {
        setTimeout(() => {
            this.applicationRevision = applicationRevision;
            this.operatingSystems = this.osService.list();
            this.locations = AWSRegion.get();
            $(this.list).dropdown({
                action: 'activate',
                onChange: this.osChanged,
            });
            $(this.locationList).dropdown({
                action: 'activate',
                onChange: this.locationChanged,
            });
            //todo fix multicard dropdowns
        }, 1000);
    }

    osChanged = (value: string, text: any, item: any) => {
        this.template.operatingSystem = this.osService.get(UUID.fromString(value));
    };

    locationChanged = (value: string, text: any, item: any) => {
        this.template.location = AWSRegion.find(value);
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
        //todo add validation -- require a name, at the very least
        this.loading = true;
        this.client.fetch('compute/index', {
            method: 'put',
            body: JSON.stringify(this.marshaller.write(this.template))
        }).then(t => {
            this.loading = false;
            this.template = t as any;
            this.selectCredential();
        });
    }

    selectNodeTemplate(template: any) : void {
        console.log('os', this.os_id);
        console.log('location', this.location_id);
        //todo attach OS and location to template, if needed
        this.template = template;
        this.selectCredential();
    }

    selectCredential() : void {
        this.selectingCredential = true;
        this.loading = true;
        //todo pull in existing credentials
        this.loading = false;
    }

    save() : void {
        //todo require a credential and a node template
        // if (typeof this.template != 'undefined') {
        //     this.applicationRevision.requirements.push(this.template);
        // }
        // if (typeof this.credential != 'undefined') {
        //     this.applicationRevision.requirements.push(this.credential);
        // }
        this.controller.ok(this.applicationRevision);
    }

}