import * as showdown from 'showdown';
import {Identifier} from "common/lib/lang";
import {HttpClient} from "aurelia-fetch-client";
import {Application} from './application';
import {ApplicationRevision, ApplicationRevisionDeployer} from "apps/workspaces/model/application";
import {bindable, autoinject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {NodeTemplateDialog} from "./dialogs/node-template";
import {OperatingSystemDialog} from "./dialogs/operating-system";
import {DeployerDialog} from "./dialogs/deployer";
import {OperatingSystem} from "common/model/api/hal/api";
import {ApplicationDialog} from "./dialogs/applications";
import {ServiceDialog} from "./dialogs/service";
import {InstancesDialog} from "./dialogs/instances";
import {NavigationInstruction} from "aurelia-router";
/**
 * Created by dustinlish on 2/20/17.
 */

@autoinject
export class Summary {
    loading: boolean;

    requirementDD: HTMLElement;
    requirementPopup: HTMLElement;

    @bindable
    popupState: string;

    @bindable
    instance: any;

    @bindable
    instances: any[];


    private applicationRevision: ApplicationRevision;

    private summary: HTMLElement;
    @bindable
    private loadingSummary: boolean;
    private id: string;
    private workspaceId: string;


    constructor(private client: HttpClient,
                private parent: Application,
                private dialogService: DialogService) {

    }

    attached(): void {
        $(this.requirementDD).dropdown();
        $(this.requirementPopup).modal({
            onHide: () => {
                this.popupCleanup();
            }
        });


        // this.client.fetch(`applications/${this.id}/base`)
        //     .then(t => t.json() as any)
        //     .then(t => {
        //         this.applicationRevision = t;
        //         if (typeof this.applicationRevision.requirements == 'undefined') {
        //             this.applicationRevision.requirements = [];
        //         }
        //         this.load(this.id);
        //         this.loading = false;
        //     });
    }

    refresh() : void {
        this.client.fetch(`workspaces/${this.workspaceId}/applications/${this.id}/workspace/file`, {
            method: 'put',
            body: JSON.stringify({
                path: 'README.md'
            })
        })
        .then(t => t.json() as any)
        .then(t => {
            if(t.children.child && t.children.child.length > 0) {
                let child = t.children.child[0];
                console.log(child.revision);
                this.client.fetch(`workspaces/${this.workspaceId}/applications/${this.id}/workspace/${child.revision}`)
                    .then(t => t.json())
                    .then(t => {
                        let converter = new showdown.Converter();
                        converter.setFlavor('github');
                        this.summary.innerHTML = converter.makeHtml((t as any).text as string);
                        this.loadingSummary = false;
                    });
            }
        });
    }

    activate(params: any, a: any, workspace: NavigationInstruction) {
        this.id = params.id;
        this.workspaceId = workspace.parentInstruction.parentInstruction.params.id;
        this.refresh();
    }

    openNodeTemplate() {
        this.popupCleanup();
        this.dialogService.open({
            viewModel: NodeTemplateDialog,
            model: this.applicationRevision
        }).then(t => {
        });
    }

    openOperatingSystem() {
        this.popupCleanup();
        this.dialogService.open({
            viewModel: OperatingSystemDialog,
            model: this.applicationRevision
        }).then(t => {
        })
    }

    openDeployer() {
        this.popupCleanup();
        this.dialogService.open({
            viewModel: DeployerDialog,
            model: this.applicationRevision
        }).then(t => {
        });
    }

    openApplications() {
        this.popupCleanup();
        this.dialogService.open({
            viewModel: ApplicationDialog,
            model: this.applicationRevision
        }).then(t => {
        });
    }

    openService() {
        this.popupCleanup();
        this.dialogService.open({
            viewModel: ServiceDialog,
            model: this.applicationRevision
        }).then(t => {
        });
    }

    openInstances() {
        this.popupCleanup();
        this.dialogService.open({
            viewModel: InstancesDialog,
            model: this.applicationRevision
        }).then(t => {
        });
    }

    openDialog(requirement: any) {
        //console.log('requirement', requirement);
        if (typeof requirement.type != 'undefined' && requirement.type == 'computeTemplate') {
            this.openNodeTemplate();
        }
        if (requirement instanceof ApplicationRevisionDeployer) {
            this.openDeployer();
        }
        if (requirement instanceof OperatingSystem) {
            this.openOperatingSystem();
        }
        //todo check type and open relevant popup for applications, service and instances
    }

    clearRequirement(requirement: any): void {
        let index = this.applicationRevision.requirements.indexOf(requirement);
        this.applicationRevision.requirements.splice(index, 1);
    }

    popupCleanup(): void {
        $(this.requirementDD).find('.active').removeClass('active');
        $(this.requirementDD).find('.selected').removeClass('selected');
    }

    private load(appId: string): void {
        this.loadingSummary = true;
        let revision = this.applicationRevision,
            readme = revision.readme;
        this.client
            .fetch(`applications/${appId}/readme`)
            .then(t => t.json() as any)
            .then(t => {
                let converter = new showdown.Converter();
                converter.setFlavor('github');
                this.summary.innerHTML = converter.makeHtml(t.data);
                this.loadingSummary = false;
            });
    }

}