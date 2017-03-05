import * as showdown from 'showdown';
import {Identifier} from "common/lib/lang";
import {HttpClient} from "aurelia-fetch-client";
import {Application} from './application';
import {ApplicationRevision} from "apps/workspaces/model/application";
import {bindable, autoinject} from "aurelia-framework";
import {OperatingSystemService} from "common/model/api/hal/os";
import {DialogService} from "aurelia-dialog";
import {NodeTemplateDialog} from "./dialogs/node-template";
import {OperatingSystemDialog} from "./dialogs/operating-system";
/**
 * Created by dustinlish on 2/20/17.
 */

@autoinject
export class Summary {
    loading             : boolean;

    requirementDD       : HTMLElement;
    requirementPopup    : HTMLElement;

    @bindable
    popupState          : string;

    @bindable
    deployer            : string;

    // @bindable
    // os                  : string;
    // @bindable
    // template            : any;

    @bindable
    instance            : any;

    @bindable
    selectingTemplate   : boolean = false;

    @bindable
    nodeTemplates       : any[];

    @bindable
    instances           : any[];

    @bindable
    applications        : any[];


    private applicationRevision     : ApplicationRevision;

    private summary                 : HTMLElement;
    @bindable
    private loadingSummary          : boolean;
    private  id                     : string;


    constructor(
        private osService:OperatingSystemService,
        private client: HttpClient,
        private parent: Application,
        private dialogService:DialogService
    ) {

    }

    attached() : void {
        $(this.requirementDD).dropdown();
        $(this.requirementPopup).modal({
            onHide: () => {
                this.popupCleanup();
            }
        });


        this.client.fetch(`applications/${this.id}/base`)
            .then(t => t.json() as any)
            .then(t => {
                this.applicationRevision = t;
                this.parent.applicationRevision = t;
                this.load(this.id);
                this.loading = false;
            });
    }

    activate(identifier: Identifier) {
        this.id = identifier.id;
        this.loading = true;
    }



    openNodeTemplate() {
        this.dialogService.open({
            viewModel: NodeTemplateDialog,
            model: this.applicationRevision
        }).then(t => {
            //todo figure out why this isn't working
            console.log('dialog response', t);
            this.popupCleanup();
        });
    }

    openOperatingSystem() {
        this.dialogService.open({
            viewModel: OperatingSystemDialog,
            model: this.applicationRevision
        }).then(t => {
            //todo figure out why this isn't working
            console.log('dialog response', t);
            this.popupCleanup();
        })
    }


    openPopup(state: string) : void {
        this.popupState = state;
        $(this.requirementPopup).modal('show');
    }

    popupCleanup() : void {
        this.popupState = '';
        $(this.requirementDD).find('.active').removeClass('active');
        $(this.requirementDD).find('.selected').removeClass('selected');
    }

    closePopup() : void {
        this.popupCleanup();
        $(this.requirementPopup).modal('hide');
    }

    selectDeployer(deployer: string) : void {
        this.deployer = deployer;
        this.closePopup();
    }

    clearDeployer() : void {
        this.deployer = '';
    }

    clearOS() : void {
        this.applicationRevision.operatingSystem = null;
        //todo save applicationRevision
    }

    saveService() : void {
        this.closePopup();
    }

    clearNodeTemplate() : void {
        //todo update applicationRevision
        this.applicationRevision.template = null;
    }

    selectInstance(instance : any) : void {
        this.instance = instance;
        this.closePopup();
    }

    selectApplication() : void {
        this.closePopup();
    }



    private load(appId:string): void {
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