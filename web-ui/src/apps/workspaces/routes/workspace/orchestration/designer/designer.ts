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
import {HALTemplateProviderFactory} from "apps/workspaces/lib/palette/orchestration/hal-templates/hal-template-provider-factory";
import {Canvas} from "lib/designer/canvas/canvas";
import {Designer} from "lib/designer/core/designer";
import {Router} from "aurelia-router";

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
        registryElementLoader: RegistryElementLoader,
        private templateProviderFactory : HALTemplateProviderFactory,
        private router: Router
    ) {
        this.codec = new JsonCodec();
        this.elementFactory = elementFactory;
        this.registryFactory = new RegistryProviderFactory();
        this.codec.registerLoader("RegistryElement", registryElementLoader);
        // this.codec.register(RegistryElement, new RegistryElementLoader())
    }
    
    
    getCodec() : Codec {
        return this.codec;
    }


    attached() : void {
        this.designerManager.toggleLoading();
        this.configure();
    }

    private configure() {
        this.workspaceService.current().then(w => {
            this.orchestration = this.workspaceService.template;
            this.orchestrationService.bind(this.orchestration.id).then(t => {
                this.orchestrationService.currentGraph().then(t => {
                    let canvas = this.designerManager.getCurrentCanvas(),
                        designer = this.designerManager.getCurrent();
                    this.configureEvents(designer, t, canvas);
                    this.designerManager.toggleLoading();
                });
            })
        });
    }

    configureEvents(designer: Designer, t, canvas: Canvas) {
        this.configureProviders(canvas).then(c => {
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
            });
        });
    }


    configureProviders(canvas: Canvas) : Promise<Canvas>{
        return Promise.all([
            this.templateProviderFactory.register(canvas),
            this.elementFactory.register(canvas)
        ]).then(t => t[0])
    }
}