import * as showdown from 'showdown';
import {Identifier} from "common/lib/lang";
import {HttpClient} from "aurelia-fetch-client";
import {Application} from './application';
import {ApplicationRevision} from "apps/workspaces/model/application";
import {bindable, autoinject} from "aurelia-framework";
import {OperatingSystemService} from "common/model/api/hal/os";
/**
 * Created by dustinlish on 2/20/17.
 */

@autoinject
export class Summary {

    requirementDD       : HTMLElement;
    requirementPopup    : HTMLElement;

    @bindable
    popupState          : string;

    @bindable
    deployer            : string;

    @bindable
    os                  : string;

    @bindable
    template            : any;

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


    private applicationRevision: ApplicationRevision;

    private summary: HTMLElement;

    constructor(private osService:OperatingSystemService, private client: HttpClient, private parent: Application) {

    }


    attached() : void {
        $(this.requirementDD).dropdown();
    }

    openPopup(state: string) : void {
        this.popupState = state;
        console.log(state);
        $(this.requirementPopup).modal('show');
        //todo set closePopup as a callback, just in case they click out
    }

    closePopup() : void {
        this.popupState = '';
        $(this.requirementPopup).modal('hide');
        $(this.requirementDD).find('.active').removeClass('active');
    }

    selectDeployer(deployer: string) : void {
        this.deployer = deployer;
        this.closePopup();
    }

    selectOS(os: string) : void {
        this.os = os;
        this.closePopup();
    }

    saveService() : void {
        this.closePopup();
    }

    toggleTemplate(state : boolean) : void {
        this.selectingTemplate = state;
    }

    saveNodeTemplate() : void {
        //todo save new node template
        this.closePopup();
    }

    selectNodeTemplate(template : any) : void {
        this.template = template;
        this.closePopup();
    }

    selectInstance(instance : any) : void {
        this.instance = instance;
        this.closePopup();
    }

    selectApplication() : void {
        this.closePopup();
    }


    activate(identifier: Identifier) {



        let id = identifier.id;

        this.client.fetch(`applications/${id}`)
            .then(t => t.json() as any)
            .then(t => {
                this.applicationRevision = t;
                this.parent.applicationRevision = t;

                this.load(id);
            });
    }

    private load(appId:string): void {
        let revision = this.applicationRevision,
            readme = revision.readme;
        this.client
            .fetch(`applications/${appId}/readme`)
            .then(t => t.json() as any)
            .then(t => {

                let converter = new showdown.Converter();
                this.summary.innerHTML = converter.makeHtml(t.data);




            });
    }

}