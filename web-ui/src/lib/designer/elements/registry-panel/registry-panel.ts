import {autoinject, bindable, customElement} from "aurelia-framework";
import {DockerRegistry, DockerContainer} from "lib/hal/docker/model";
import {Canvas} from "lib/designer/canvas/canvas";
import {DesignerManager} from "lib/designer/core";
import {DockerRegistryService} from "lib/hal/docker/service";
import {ElementFactoryProvider, ElementFactory} from "lib/designer/canvas/palette";
import {RegistryElementFactory} from "apps/workspaces/lib/palette/orchestration/registries/provider-factory";

@autoinject
@customElement('registry-panel')
export class RegistryPanel {

    @bindable
    public active                   : boolean;

    @bindable
    private loading                 : boolean;

    @bindable
    private registries              : DockerRegistry[];

    @bindable
    private activeRegistry          : DockerRegistry;

    @bindable
    private factories               : ElementFactory[];

    private canvas                  : Canvas;

    private model                   : ElementFactoryProvider;

    constructor(private readonly designerManager: DesignerManager,
        private dockerRegistryService: DockerRegistryService) {
    }

    activate(provider: ElementFactoryProvider) {
        this.model = provider;

    }

    attached() : void {
        this.canvas = this.designerManager.getCurrentCanvas();
        this.factories = [];
        this.loadRegistries();
        this.makeFactories('boop');
        console.log(this.canvas);
        //todo detect if there is an orchestration on the board or else disable
    }

    loadRegistries() : void {
        // this.loading = true;
        // this.dockerRegistryService.list()
        //     .then(t => {
        //         this.registries = t;
        //         this.loading = false;
        //     });
        this.registries = [];
    }

    setActive(id: string) : void {
        this.loading = true;
        this.dockerRegistryService.bind(id)
            .then(t => {
                this.activeRegistry = t;
                this.makeFactories(id);
            });
    }

    makeFactories(id: string) : void {
        this.loading = true;
        this.dockerRegistryService.getContainers(id).then(cs => {
            this.factories = cs.map(c => new RegistryElementFactory(
                c.slug,
                c.name,
                c.logo_url.large ? c.logo_url.large : 'assets/icons/designer/docker-service.svg')
            );
            this.loading = false;
        })
    }



}