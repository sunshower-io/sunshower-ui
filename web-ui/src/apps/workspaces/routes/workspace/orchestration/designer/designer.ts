import {
    autoinject,
    customElement,
    bindable
} from "aurelia-framework";
import {
    OrchestrationProviderFactory
} from "apps/workspaces/lib/palette/orchestration/templates/provider-factory";
import {
    OrchestrationTemplateService
} from "apps/workspaces/lib/model/core/orchestration-template";
import {
    RegistryElement,
    RegistryProviderFactory
} from "apps/workspaces/lib/palette/orchestration/registries/provider-factory";
import {DesignerManager} from "lib/designer/core/designer-manager";
import {Materialize} from 'materialize-css';
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace/service";
import {Codec} from "lib/designer/codec/codec";
import {JsonCodec} from "lib/designer/codec/json-codec";
import {
    OrchestrationTemplate
} from "apps/workspaces/lib/model/core/orchestration-template/model";
import {
    RegistryElementLoader
} from "apps/workspaces/lib/palette/orchestration/registries/registry-element-loader";

@autoinject
@customElement('orchestration-designer')
export default class OrchestrationDesigner {

    @bindable
    private registryFactory: RegistryProviderFactory;

    @bindable
    private orchestration: OrchestrationTemplate;

    private codec           : Codec;

    @bindable
    private elementFactory: OrchestrationProviderFactory;

    constructor(
        elementFactory: OrchestrationProviderFactory,
        private orchestrationService: OrchestrationTemplateService,
        private workspaceService: WorkspaceService,
        private designerManager: DesignerManager,
        registryElementLoader: RegistryElementLoader
    ) {
        this.codec = new JsonCodec();
        this.elementFactory = elementFactory;
        this.registryFactory = new RegistryProviderFactory();
        this.codec.registerLoader("RegistryElement", registryElementLoader);
        // this.codec.register(RegistryElement, new RegistryElementLoader())
    }


    attached() : void {
        this.designerManager.toggleLoading();
        this.workspaceService.current().then(w => {
            this.orchestration = this.workspaceService.template;
            this.orchestrationService.bind(this.orchestration.id).then(t => {
                this.orchestrationService.currentGraph().then(t => {
                    let canvas = this.designerManager.getCurrentCanvas(),
                        designer = this.designerManager.getCurrent();

                    designer.setCodec(this.codec);
                    designer.setGraph(t);
                    canvas.listen('canvas-saved').forEach(t => {
                        console.log(t.data);
                        this.orchestrationService.saveGraph(t.data)
                            .then(t => {
                                Materialize.toast(`Successfully saved designer`, 2000);
                            });
                    });
                    canvas.listen('no-drop-target').forEach(t => {
                        Materialize.toast(`No place to put ${(t.data as any).elementName}. Be sure to add an orchestration provider`, 5000)
                    })
                    this.designerManager.toggleLoading();
                });
            })
        });
    }



}