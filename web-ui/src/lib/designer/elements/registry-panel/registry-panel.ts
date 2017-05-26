import {autoinject, bindable, customElement} from "aurelia-framework";
import {DockerRegistry, DockerContainer} from "lib/hal/docker/model";
import {Canvas} from "lib/designer/canvas/canvas";
import {DesignerManager} from "lib/designer/core";
import {DockerRegistryService} from "lib/hal/docker/service";

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
    private containers              : DockerContainer[];

    private icon                    : string = "mdi-apps";

    private canvas                  : Canvas;

    constructor(private readonly designerManager: DesignerManager,
        private dockerRegistryService: DockerRegistryService) {
    }

    attached() : void {
        this.canvas = this.designerManager.getCurrentCanvas();
        this.containers = [];
        this.loadRegistries();
        this.getContainers(null);
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
                this.getContainers(id);
            });
    }

    getContainers(id: string) : void {
        this.loading = true;
        this.dockerRegistryService.getContainers(id).then(cs => {
            this.containers = cs;
            this.loading = false;
        })
    }



}