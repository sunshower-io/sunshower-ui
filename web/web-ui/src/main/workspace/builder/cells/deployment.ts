import {Registry} from 'utils/registry';
import {Task} from "task/tasks";
import {AbstractVertex} from "../graph/vertex";
import {
    Layer,
    mxImage,
    mxCell,
    mxConstants,
    mxCellOverlay
} from "mxgraph";
import {Builder} from "../graph/builder";
import {
    VertexMenu,
    NetworkMenuItem,
} from "../menu/task-cell";
import {mxEvent} from "mxgraph";
import {Listener, ObservedEvent} from "utils/observer";



export class ApplicationDeployment extends AbstractVertex<Task> implements Listener {

    host: Builder;
    constructor(registry: Registry,
                task: Task,
                parent: Layer,
                x: number,
                y: number) {
        super(task.id, task, parent, x, y, 160, 160, registry);
        this.setAttribute('constituent', '1');
    }


    addTo(builder: Builder): mxCell {
        this.createMenu(builder);
        return this.addChildren(builder);
    }

    private addChildren(builder: Builder) {
        this.host = builder;
        let result = super.addTo(builder);
        return result;
    }

    private createMenu(builder: Builder) {
        let menu = new VertexMenu(builder, this, '\uf013');
        menu.addItem(new NetworkMenuItem());
    }

    protected addOperatingSystemOverlay(): mxCellOverlay {
        let
            url = `assets/sui/themes/hasli/assets/images/logos/os/${this.data.deploymentTarget.operatingSystem.icon}`,
            image = new mxImage(url, 24, 24),
            iconOverlay = new mxCellOverlay(
                image,
                null,
                mxConstants.ALIGN_RIGHT,
                mxConstants.ALIGN_TOP,
                {x: -14, y: 14},
                // null,
                'default'
            );
        return iconOverlay;
    }


    protected applicationOverlay(): mxCellOverlay {
        let
            url = `${this.registry.get(Registry.S3_IMAGES_PATH)}/${this.data.icon}`,
            image = new mxImage(url, 40, 40),
            iconOverlay = new mxCellOverlay(
                image,
                null,
                mxConstants.ALIGN_CENTER,
                mxConstants.ALIGN_MIDDLE,
                null,
                'default'
            );
        return iconOverlay;
    }

    protected createOverlays(): mxCellOverlay[] {
        let results = [];
        results.push(this.applicationOverlay());
        if (
            this.data.deploymentTarget &&
            this.data.deploymentTarget.operatingSystem) {
            results.push(this.addOperatingSystemOverlay());
        }

        return results;
    }

    apply(event: ObservedEvent): void {
        this.host.addCellOverlay(this, this.addOperatingSystemOverlay());
    }
}


