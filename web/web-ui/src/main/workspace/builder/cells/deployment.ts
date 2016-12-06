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
    TaskMenu,
    CloseMenuItem,
    EditMenuItem,
    InfrastructureMenuItem,
    ApplicationMenuItem,
    MenuHandler
} from "../menu/task-cell";
import {Kv} from "../../../../utils/objects";

import {createEvent} from "utils/events";
import {mxEvent} from "mxgraph";


export class AbstractDeploymentUnit extends AbstractVertex<Task> {

    constructor(registry: Registry,
                task: Task,
                parent: DeploymentUnit) {
        super(registry, task.id, task, parent, 0, 24, 160, 136);
        this.value = task.name;
        this.setComponent(true);
        this.setAttribute('hover', '0');
    }

    protected createStyle(): string {
        return Kv.create(';')
            .pair('shape', 'label')
            .pair('imageWidth', 24)
            .pair('imageHeight', 24)
            .pair('fillOpacity', 0)
            .pair('strokeColor', 'none')
            .pair('verticalAlign', 'bottom')
            .pair('spacingBottom', '24')
            .pair('fontColor', '#000000')
            .pair('fontStyle', mxConstants.FONT_BOLD)
            .toString();
    }
}

export class DeploymentUnit extends AbstractVertex<Task> implements MenuHandler {
    /**
     *
     */
    applicationDeployment: ApplicationDeploymentUnit;

    /**
     *
     */
    configurationDeployment: ConfigurationDeploymentUnit;

    /**
     *
     */
    infrastructureDeployment: InfrastructureDeploymentUnit;


    constructor(registry: Registry,
                task: Task,
                parent: Layer,
                x: number,
                y: number) {
        super(registry, task.id, task, parent, x, y, 160, 160);
        this.applicationDeployment = new ApplicationDeploymentUnit(
            registry,
            task,
            this
        );

        this.infrastructureDeployment = new InfrastructureDeploymentUnit(
            registry, task, this
        );
        this.infrastructureDeployment.setVisible(false);

        this.configurationDeployment = new ConfigurationDeploymentUnit(
            registry, task, this
        );

        this.configurationDeployment.setVisible(false);

    }


    before(): void {
        this.applicationDeployment.setVisible(false);
        this.configurationDeployment.setVisible(false);
        this.infrastructureDeployment.setVisible(false);
    }

    after(): void {

    }


    addTo(builder: Builder): mxCell {
        this.createMenu(builder);
        return this.addChildren(builder);
    }

    private addChildren(builder: Builder) {
        let result = super.addTo(builder);
        this.applicationDeployment.addTo(builder);
        this.configurationDeployment.addTo(builder);
        this.infrastructureDeployment.addTo(builder);
        return result;
    }

    private createMenu(builder: Builder) {
        let menu = new TaskMenu(builder, this);
        menu.add(new CloseMenuItem());
        menu.add(new ApplicationMenuItem(this, this.applicationDeployment));
        menu.add(new EditMenuItem(this, this.configurationDeployment));
        menu.add(new InfrastructureMenuItem(this, this.infrastructureDeployment));
    }
}

export class ApplicationDeploymentUnit extends AbstractDeploymentUnit {


    protected createOverlays(): mxCellOverlay[] {
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
        return [iconOverlay];
    }
}

export class InfrastructureDeploymentUnit extends AbstractDeploymentUnit {

    private dispatcher: HTMLElement;

    constructor(registry: Registry,
                task: Task,
                parent: DeploymentUnit) {
        super(registry, task, parent);
        this.value = '';
    }


    addTo(builder: Builder): mxCell {
        this.dispatcher = builder.container;
        return super.addTo(builder);
    }

    protected createOverlays(): mxCellOverlay[] {
        let
            url = 'assets/sui/themes/hasli/assets/images/icons/plus-green-icon.svg',
            image = new mxImage(url, 40, 40),
            iconOverlay = new mxCellOverlay(
                image,
                null,
                mxConstants.ALIGN_CENTER,
                mxConstants.ALIGN_MIDDLE,
                null,
                'default'
            );
        this.addListeners(iconOverlay);
        return [iconOverlay];
    }

    private addListeners(overlay: mxCellOverlay): void {
        overlay.addListener(mxEvent.CLICK, (sender: any, e: mxEvent) : void => {
            let event = createEvent('add-infrastructure', {});
            this.dispatcher.dispatchEvent(event);
        });
    }

}

export class ConfigurationDeploymentUnit extends AbstractDeploymentUnit {

    constructor(registry: Registry,
                task: Task,
                parent: DeploymentUnit) {
        super(registry, task, parent);
        this.value = "Configuration";
    }
}