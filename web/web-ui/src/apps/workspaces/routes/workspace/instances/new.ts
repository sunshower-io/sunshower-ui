

import {autoinject, bindable} from "aurelia-framework";
import {UUID} from "common/lib/utils/uuid";
import {OperatingSystemService} from "common/model/api/hal/os";
import {Workspace} from "apps/workspaces/routes/workspace/index";
import {
    NodeConfiguration,
    InstanceDescriptor,
    Provider
} from "common/model/api/hal/api";
import {HttpClient} from "aurelia-fetch-client";
import {CredentialSecret} from "common/model/security/credentials";
import {
    newNodeTemplate,
    ComputeNodeTemplate,
    ComputeNodeTemplateMarshaller
} from "common/model/api/hal/compute";

@autoinject
export class NewInstance {

    providerList                : HTMLElement;

    @bindable
    providers                   : HTMLElement;
    list                        : HTMLElement;

    instanceType                : HTMLElement;

    credentialList              : HTMLElement;

    providerId                  : string;

    private searching           : boolean;

    private loading             : boolean = true;
    private credential          : CredentialSecret;
    private addingCredential    : boolean = false;
    private credentials         : CredentialSecret[];

    private template            : ComputeNodeTemplate;

    private cloudProviders      : Provider[];
    private provider            : Provider;

    private credentialId :string;
    private configuration: NodeConfiguration;

    instanceTypes: InstanceDescriptor;


    constructor(
        private parent:Workspace,
        private client:HttpClient,
        private osService:OperatingSystemService,
    ) {
        this.template = newNodeTemplate();
    }



    addCredential() {
        this.addingCredential = true;
        this.credential = new CredentialSecret();
    }

    save() : void {
        this.client.fetch('secrets/vault', {
            method: 'post',
            body: JSON.stringify(this.credential)
        }).then(data => {
            this.listCredentials();
        });
    }


    private listProviders() {
        this.client.fetch('provider')
            .then(response => response.json() as any)
            .then(providers => this.cloudProviders = providers);
    }

    private listCredentials() {
        this.client.fetch('secrets/vault/io.hasli.vault.api.secrets.CredentialSecret/list')
            .then(response => response.json() as any)
            .then(data => {
                this.credentials = data;
                setTimeout(() => {
                    this.loading = false;
                });
            });
    }


    search(): void {
        if (!this.searching) {
            this.searching = true;
            this.client.fetch('search/compute/search', {
                method: 'post',
                body: JSON.stringify(this.configuration)
            }).then(response => response.json() as any)
                .then(data => {
                    this.instanceTypes = data;
                    this.searching = false;
                }).catch(r => {
                this.client.fetch('search/compute')
                    .then(data => data.json() as any)
                    .then(data => {
                        this.instanceTypes = data;
                        this.searching = false;
                    });

            });
        }
    }

    imageChanged = (value: string, text:any, item:any) => {
        this.template.image.instanceType = value;
    };


    providerChanged = (value: string, text: any, item: any) => {
        this.providerId = value;
    };

    credentialChanged = (value: string, text: any, item: any) => {
        this.credentialId = value;
    };

    osChanged = (value: string, text: any, item: any) => {
        let os = this.osService.get(UUID.fromString(value));
        this.template.operatingSystem = os;
        this.template.image.imageId = os.provider.imageId;
    };

    attached(): void {
        this.listCredentials();
        this.listProviders();
        setTimeout(() => {
            $(this.providers).dropdown();

            $(this.providerList).dropdown({
                action:'activate',
                onChange: this.providerChanged
            });
            $(this.credentialList).dropdown({
                action:'activate',
                onChange: this.credentialChanged
            });
            $(this.list).dropdown({
                action: 'activate',
                onChange: this.osChanged,
            });
            $(this.instanceType).dropdown({
                action: 'activate',
                onChange: this.imageChanged,
            });
            if (this.template && this.template.operatingSystem) {
                $(this.list).dropdown('set selected', this.template.operatingSystem.id);
            }
        });
    }

    activate() : void {
        this.parent.setMenuVisible(false);
    }

    close() : void {
        this.parent.router.navigateBack();
    }

    deployInstance() : void {

        let payload = JSON.stringify(new ComputeNodeTemplateMarshaller()
            .write(this.template)),
            credentialId = this.credentialId,
            providerId = this.providerId;

        // console.log("Credential ID", this.credentialId);
        // console.log("Provider ID", this.providerId);

        this.client.fetch(`compute/${providerId}/instances/${credentialId}/deploy`, {
            method: 'post',
            body:payload
            }).then(r => {
                this.close();
        })
    }
}