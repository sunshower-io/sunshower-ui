import {
    autoinject,
    containerless,
    customElement,
    bindable
} from "aurelia-framework";
import {OrchestrationProviderFactory} from "apps/workspaces/lib/palette/orchestration/templates/provider-factory";
import {OrchestrationTemplateService} from "apps/workspaces/lib/model/core/orchestration-template";
import {RegistryProviderFactory} from "apps/workspaces/lib/palette/orchestration/registries/provider-factory";
import {DesignerManager} from "lib/designer/core/designer-manager";
import {OrchestrationTemplate} from "apps/workspaces/lib/model/core/orchestration-template/model";
import {RouteConfig} from "aurelia-router";
import {Materialize} from 'materialize-css';
import {WorkspaceService} from "../../../../lib/model/core/workspace/service";

@autoinject
@customElement('orchestration-designer')
export default class OrchestrationDesigner {

    @bindable
    private registryFactory: RegistryProviderFactory;

    @bindable
    private orchestration: OrchestrationTemplate;


    @bindable
    private elementFactory: OrchestrationProviderFactory;

    constructor(
        elementFactory: OrchestrationProviderFactory,
        private orchestrationService: OrchestrationTemplateService,
        private workspaceService: WorkspaceService,
        private designerManager: DesignerManager
    ) {
        this.elementFactory = elementFactory;
        this.registryFactory = new RegistryProviderFactory();
    }

    attached() : void {
        this.designerManager.toggleLoading();
        this.workspaceService.current().then(w => {
            this.orchestration = this.workspaceService.template;
            this.orchestrationService.bind(this.orchestration.id).then(t => {
                this.orchestrationService.currentGraph().then(t => {
                    let canvas = this.designerManager.getCurrentCanvas();
                    this.designerManager.getCurrent().setGraph(t);
                    canvas.listen('canvas-saved').forEach(t => {
                        this.orchestrationService.saveGraph(t.data)
                            .then(t => {
                                Materialize.toast(`Successfully saved designer`, 2000);
                            });
                    });
                    this.designerManager.toggleLoading();
                });
            })
        });
    }



}