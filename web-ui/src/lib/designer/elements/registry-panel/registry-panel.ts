import {autoinject, bindable, customElement} from "aurelia-framework";
import {UUID} from "lib/common/lang/uuid";
import {DockerRegistry, DockerCredential} from "lib/hal/docker/model";
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
    private activeRegistryId        : string;

    @bindable
    private activeRegistry          : DockerRegistry;

    @bindable
    private newRegistry             : DockerRegistry;

    @bindable
    private credential              : DockerCredential;

    @bindable
    private addingRegistry          : boolean;

    private nameId                  : string = UUID.random();
    private pathId                  : string = UUID.random();
    private usernameId              : string = UUID.random();
    private passwordId              : string = UUID.random();

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
        //todo detect if there is an orchestration on the board or else disable
    }

    addRegistry() : void {
        this.newRegistry = new DockerRegistry();
        this.addingRegistry = true;
        this.activeRegistry = null;
    }

    saveRegistry() : void {
        this.loading = true;
        this.newRegistry.credential = this.credential;
        this.dockerRegistryService.save(this.newRegistry)
            .then(t => {
                this.loadRegistries();
                this.newRegistry = null;
                this.addingRegistry = false;
                this.dockerRegistryService.bind(t.value)
                    .then(u => {
                        this.activeRegistry = u;
                        this.makeFactories(u.id);
                    });
            })
    }

    loadRegistries() : void {
        this.loading = true;
        this.dockerRegistryService.list()
            .then(t => {
                this.registries = t;
                this.loading = false;
            });
        this.registries = [];
    }

    setActive() : void {
        this.loading = true;
        if(this.activeRegistryId) {
            this.dockerRegistryService.bind(this.activeRegistryId)
                .then(t => {
                    this.activeRegistry = t;
                    this.makeFactories(this.activeRegistryId);
                });
        } else {
            this.activeRegistry = null;
            this.factories = [];
            this.loading = false;
        }
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