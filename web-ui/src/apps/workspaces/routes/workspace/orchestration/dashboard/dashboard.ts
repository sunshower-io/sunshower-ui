import {DialogService} from "aurelia-dialog";
import {OrchestrationTemplate, OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace";
import {bindable, autoinject} from "aurelia-framework";
import {CreateOrchestration} from "../create/create";
import {Router} from "aurelia-router";

@autoinject
export class OrchestrationDashboard {

    @bindable
    private orchestrations: OrchestrationTemplate[];

    @bindable
    private content: HTMLElement;

    @bindable
    private createBtn: HTMLElement;

    @bindable
    private panelActive: boolean;

    @bindable
    private loading: boolean;

    constructor(private workspaceService:WorkspaceService,
    private orchestrationService:OrchestrationTemplateService,
    private dialogService:DialogService,
    private router:Router) {

    }

    attached() {
        this.loadOrchestrations();
    }

    loadOrchestrations() {
        this.loading = true;
        this.workspaceService.getTemplates(this.workspaceService.workspace.id).then(o => {
            this.orchestrations = o;
            console.log(this.orchestrations);
            this.loading = false;
        }).catch(err => {
            console.log(err);
            this.orchestrations = [];
        });
    }

    create() {
        this.dialogService.open({
            viewModel: CreateOrchestration
        }).then(t => {})
    }

    open(id:string) : void {
        this.router.navigate(`${id}`);
    }

    destroy(id:string) : void {
        this.orchestrationService.destroy(id).then(t => {
            this.loadOrchestrations();
        });
    }

}